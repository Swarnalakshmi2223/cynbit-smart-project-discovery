'use client';
// src/components/discovery/DiscoveryForm.tsx
// Main multi-step form component with full state management

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DiscoveryFormData, RecommendationResult } from '@/types';
import { FORM_STEPS } from '@/constants';
import { computeRecommendation } from '@/services/recommendation.service';
import ProgressBar from './ProgressBar';
import Step1Goal from './Step1Goal';
import Step2Business from './Step2Business';
import Step3Requirements from './Step3Requirements';
import Step4Budget from './Step4Budget';
import Step5Contact from './Step5Contact';
import RecommendationCard from './RecommendationCard';

const INITIAL_FORM: DiscoveryFormData = {
  projectGoal: '',
  industry: '',
  companyName: '',
  companySize: '',
  website: '',
  currentSystems: '',
  projectDescription: '',
  requiredFeatures: '',
  currentChallenges: '',
  expectedOutcome: '',
  integrationRequirements: '',
  budgetRange: '',
  expectedTimeline: '',
  fullName: '',
  email: '',
  phone: '',
  preferredContactMethod: '',
  additionalMessage: '',
  privacyConsent: false,
};

export default function DiscoveryForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<DiscoveryFormData>(INITIAL_FORM);
  const [recommendation, setRecommendation] = useState<RecommendationResult | null>(null);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function updateField<K extends keyof DiscoveryFormData>(key: K, value: DiscoveryFormData[K]) {
    setFormData(prev => ({ ...prev, [key]: value }));
    setFieldErrors(prev => { const n = { ...prev }; delete n[key]; return n; });
  }

  function validateStep(s: number): boolean {
    const errors: Record<string, string> = {};
    if (s === 1) {
      if (!formData.projectGoal) errors.projectGoal = 'Please select a project goal.';
    }
    if (s === 2) {
      if (!formData.industry) errors.industry = 'Please select your industry.';
      if (!formData.companyName.trim()) errors.companyName = 'Company name is required.';
      if (!formData.companySize) errors.companySize = 'Please select your company size.';
    }
    if (s === 3) {
      if (formData.projectDescription.trim().length < 50) {
        errors.projectDescription = 'Please describe your project in at least 50 characters.';
      }
    }
    if (s === 4) {
      if (!formData.budgetRange) errors.budgetRange = 'Please select a budget range.';
      if (!formData.expectedTimeline) errors.expectedTimeline = 'Please select a timeline.';
    }
    if (s === 5) {
      if (!formData.fullName.trim()) errors.fullName = 'Full name is required.';
      if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Please enter a valid email address.';
      }
      if (!formData.phone.trim() || !/^[+]?[\d\s\-().]{10,15}$/.test(formData.phone)) {
        errors.phone = 'Please enter a valid phone number.';
      }
      if (!formData.preferredContactMethod) errors.preferredContactMethod = 'Please select a contact method.';
      if (!formData.privacyConsent) errors.privacyConsent = 'You must agree to the privacy policy.';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleNext() {
    if (!validateStep(step)) return;
    if (step === 4) {
      // Show recommendation between step 4 and 5
      const rec = computeRecommendation(formData);
      setRecommendation(rec);
      setShowRecommendation(true);
      return;
    }
    setStep(s => s + 1);
  }

  function handleBack() {
    if (showRecommendation) {
      setShowRecommendation(false);
      return;
    }
    setStep(s => Math.max(1, s - 1));
  }

  async function handleSubmit() {
    if (!validateStep(5)) return;
    setSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (!res.ok) {
        if (res.status === 409) {
          setSubmitError(`An enquiry with this email was submitted recently. Reference ID: ${json.referenceId}`);
        } else if (json.details) {
          const serverErrors: Record<string, string> = {};
          for (const [k, v] of Object.entries(json.details)) {
            serverErrors[k] = Array.isArray(v) ? v[0] : String(v);
          }
          setFieldErrors(serverErrors);
          setSubmitError('Please fix the errors above.');
        } else {
          setSubmitError(json.error ?? 'Submission failed. Please try again.');
        }
        return;
      }
      const { referenceId, recommendedService, emailStatus } = json.data;
      router.push(
        `/success?ref=${encodeURIComponent(referenceId)}&goal=${encodeURIComponent(formData.projectGoal)}&service=${encodeURIComponent(recommendedService)}&email=${encodeURIComponent(emailStatus?.customerEmail ?? 'unknown')}`
      );
    } catch {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  }

  const currentStep = showRecommendation ? null : FORM_STEPS[step - 1];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      {!showRecommendation && (
        <ProgressBar currentStep={step} totalSteps={FORM_STEPS.length} steps={FORM_STEPS} />
      )}

      {/* Step header */}
      {currentStep && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#1a1a2e]">{currentStep.title}</h2>
          <p className="text-gray-500 mt-1">{currentStep.description}</p>
        </div>
      )}

      {/* Recommendation between step 4 and 5 */}
      {showRecommendation && recommendation && (
        <div className="animate-fadeIn">
          <RecommendationCard recommendation={recommendation} />
          <div className="flex justify-between mt-6">
            <button
              onClick={handleBack}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              ← Back
            </button>
            <button
              onClick={() => { setShowRecommendation(false); setStep(5); }}
              className="px-8 py-3 bg-[#1a1a2e] text-white rounded-xl font-semibold hover:bg-[#16213e] transition-colors"
            >
              Continue to Contact Details →
            </button>
          </div>
        </div>
      )}

      {/* Form steps */}
      {!showRecommendation && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 animate-fadeIn">
          {step === 1 && <Step1Goal value={formData.projectGoal} onChange={v => updateField('projectGoal', v)} error={fieldErrors.projectGoal} />}
          {step === 2 && <Step2Business data={formData} onChange={updateField} errors={fieldErrors} />}
          {step === 3 && <Step3Requirements data={formData} onChange={updateField} errors={fieldErrors} />}
          {step === 4 && <Step4Budget data={formData} onChange={updateField} errors={fieldErrors} />}
          {step === 5 && <Step5Contact data={formData} onChange={updateField} errors={fieldErrors} />}

          {/* Error message */}
          {submitError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {submitError}
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>
            {step < 5 ? (
              <button
                onClick={handleNext}
                className="px-8 py-3 bg-[#1a1a2e] text-white rounded-xl font-semibold hover:bg-[#16213e] transition-colors"
              >
                Continue →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="px-8 py-3 bg-[#0ea5e9] text-white rounded-xl font-semibold hover:bg-[#0284c7] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {submitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Enquiry →'
                )}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

