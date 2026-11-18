'use client';

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
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';

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
    setFormData((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  }

  function validateStep(s: number): boolean {
    const errors: Record<string, string> = {};
    if (s === 1) {
      if (!formData.projectGoal) errors.projectGoal = 'Please select your primary project goal.';
    }
    if (s === 2) {
      if (!formData.industry) errors.industry = 'Please select your industry category.';
      if (!formData.companyName.trim()) errors.companyName = 'Company or project name is required.';
      if (!formData.companySize) errors.companySize = 'Please specify your team or company size.';
    }
    if (s === 3) {
      if ((formData.projectDescription || '').trim().length < 50) {
        errors.projectDescription = 'Please provide at least 50 characters describing your project requirements.';
      }
    }
    if (s === 4) {
      if (!formData.budgetRange) errors.budgetRange = 'Please indicate your expected budget allocation.';
      if (!formData.expectedTimeline) errors.expectedTimeline = 'Please indicate your required completion timeline.';
    }
    if (s === 5) {
      if (!formData.fullName.trim()) errors.fullName = 'Please enter your full name.';
      if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Please provide a valid corporate or personal email address.';
      }
      if (!formData.phone.trim() || !/^[+]?[\d\s\-().]{7,20}$/.test(formData.phone)) {
        errors.phone = 'Please provide a valid direct phone number.';
      }
      if (!formData.preferredContactMethod) {
        errors.preferredContactMethod = 'Please choose how our team should contact you.';
      }
      if (!formData.privacyConsent) {
        errors.privacyConsent = 'You must review and agree to the privacy consent to proceed.';
      }
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleNext() {
    if (!validateStep(step)) return;

    if (step === 4) {
      const rec = computeRecommendation(formData);
      setRecommendation(rec);
      setShowRecommendation(true);
      return;
    }

    setStep((s) => s + 1);
  }

  function handleBack() {
    if (showRecommendation) {
      setShowRecommendation(false);
      return;
    }
    setStep((s) => Math.max(1, s - 1));
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
          setSubmitError(`A recent enquiry with this email is already registered. Reference ID: ${json.referenceId}`);
        } else if (json.details) {
          const sErrors: Record<string, string> = {};
          for (const [k, v] of Object.entries(json.details)) {
            sErrors[k] = Array.isArray(v) ? v[0] : String(v);
          }
          setFieldErrors(sErrors);
          setSubmitError('Please address the highlighted fields.');
        } else {
          setSubmitError(json.error ?? 'Submission error. Please check your network and try again.');
        }
        return;
      }

      const { referenceId, recommendedService, emailStatus } = json.data;
      router.push(
        `/success?ref=${encodeURIComponent(referenceId)}&goal=${encodeURIComponent(
          formData.projectGoal
        )}&service=${encodeURIComponent(recommendedService)}&email=${encodeURIComponent(
          emailStatus?.customerEmail ?? 'unknown'
        )}`
      );
    } catch {
      setSubmitError('Network failure occurred. Please retry.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Step Indicator */}
      {!showRecommendation && (
        <ProgressBar currentStep={step} totalSteps={FORM_STEPS.length} steps={FORM_STEPS} />
      )}

      {/* Main Glass Form Card */}
      <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-800 shadow-2xl p-6 sm:p-9 relative before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-cyan-400 before:to-transparent before:rounded-t-2xl">
        {/* Recommendation Reveal Screen */}
        {showRecommendation && recommendation ? (
          <div className="space-y-6">
            <RecommendationCard recommendation={recommendation} />

            <div className="flex items-center justify-between pt-6 border-t border-slate-800">
              <button
                type="button"
                onClick={handleBack}
                className="px-5 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Adjust Parameters</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowRecommendation(false);
                  setStep(5);
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 hover:opacity-95 text-slate-950 text-xs font-extrabold transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-2"
              >
                <span>Continue to Contact Dossier</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Step Components */}
            {step === 1 && (
              <Step1Goal
                value={formData.projectGoal}
                onChange={(v) => updateField('projectGoal', v)}
                error={fieldErrors.projectGoal}
              />
            )}
            {step === 2 && (
              <Step2Business data={formData} onChange={updateField} errors={fieldErrors} />
            )}
            {step === 3 && (
              <Step3Requirements data={formData} onChange={updateField} errors={fieldErrors} />
            )}
            {step === 4 && (
              <Step4Budget data={formData} onChange={updateField} errors={fieldErrors} />
            )}
            {step === 5 && (
              <Step5Contact data={formData} onChange={updateField} errors={fieldErrors} />
            )}

            {/* Error Banner */}
            {submitError && (
              <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-300 text-xs flex items-start gap-2 font-medium">
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-800">
              <button
                type="button"
                onClick={handleBack}
                disabled={step === 1}
                className="px-5 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors disabled:opacity-20 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {step < 5 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-extrabold transition-all shadow-md shadow-cyan-500/20 flex items-center gap-2 group"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-0.5 transition-transform" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-400 hover:opacity-95 text-slate-950 font-black text-xs shadow-xl shadow-cyan-500/30 transition-all flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                      <span>Transmitting Dossier...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-slate-950" />
                      <span>Submit Project Discovery</span>
                      <ArrowRight className="w-4 h-4 text-slate-950" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Security note footer */}
      <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-slate-500 font-mono">
        <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
        <span>256-bit encrypted submission • Strict confidentiality guaranteed</span>
      </div>
    </div>
  );
}
