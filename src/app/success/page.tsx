'use client';
// src/app/success/page.tsx — Enquiry confirmation page

import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import { CheckCircle, Copy, Check, ArrowRight, Mail, AlertCircle } from 'lucide-react';

function SuccessContent() {
  const params = useSearchParams();
  const ref = params.get('ref') ?? 'Unknown';
  const goal = params.get('goal') ?? '';
  const service = params.get('service') ?? '';
  const emailStatus = params.get('email') ?? 'unknown';
  const [copied, setCopied] = useState(false);

  async function copyRef() {
    await navigator.clipboard.writeText(ref);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="max-w-xl mx-auto">
      {/* Success icon */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h1 className="text-3xl font-extrabold text-[#1a1a2e] mb-2">Enquiry Submitted!</h1>
        <p className="text-gray-500">Your project enquiry has been successfully submitted.</p>
      </div>

      {/* Reference ID */}
      <div className="bg-[#1a1a2e] rounded-2xl p-6 mb-6 text-center">
        <p className="text-gray-400 text-sm mb-2">Your Enquiry Reference ID</p>
        <div className="text-3xl font-black text-[#0ea5e9] tracking-widest mb-4">{ref}</div>
        <button
          onClick={copyRef}
          className="inline-flex items-center gap-2 bg-white/10 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
        >
          {copied ? <><Check className="w-4 h-4 text-green-400" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy Reference ID</>}
        </button>
        <p className="text-xs text-gray-500 mt-3">Save this ID to track your enquiry status.</p>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6 space-y-3">
        <h2 className="font-bold text-[#1a1a2e] mb-4">Submission Summary</h2>
        {goal && (
          <div className="flex justify-between text-sm py-2 border-b border-gray-100">
            <span className="text-gray-500">Project Goal</span>
            <span className="font-medium text-[#1a1a2e] text-right max-w-xs">{goal}</span>
          </div>
        )}
        {service && (
          <div className="flex justify-between text-sm py-2 border-b border-gray-100">
            <span className="text-gray-500">Recommended Service</span>
            <span className="font-medium text-[#0ea5e9] text-right max-w-xs">{service}</span>
          </div>
        )}
        <div className="flex justify-between text-sm py-2">
          <span className="text-gray-500">Status</span>
          <span className="inline-flex items-center gap-1 font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full text-xs">New</span>
        </div>
      </div>

      {/* Email status */}
      <div className={`rounded-xl p-4 mb-6 flex items-start gap-3 ${
        emailStatus === 'sent' ? 'bg-green-50 border border-green-100' :
        emailStatus === 'not_configured' ? 'bg-yellow-50 border border-yellow-100' :
        'bg-gray-50 border border-gray-100'
      }`}>
        {emailStatus === 'sent' ? (
          <><Mail className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><p className="text-sm text-green-700">A confirmation email has been sent to your email address.</p></>
        ) : emailStatus === 'not_configured' ? (
          <><AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" /><p className="text-sm text-yellow-700">Email notifications are not configured in this deployment. Please save your reference ID above.</p></>
        ) : (
          <><AlertCircle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" /><p className="text-sm text-gray-600">Email delivery status unavailable. Please save your reference ID.</p></>
        )}
      </div>

      {/* Next steps */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-8">
        <h3 className="font-bold text-[#1a1a2e] mb-3 text-sm">What Happens Next?</h3>
        {[
          'Our team will review your project requirements within 1–2 business days.',
          'A Cynbit representative will contact you using your preferred method.',
          'We will schedule a discovery call to discuss your project in detail.',
          'You will receive a tailored proposal based on your requirements.',
        ].map((step, i) => (
          <div key={i} className="flex items-start gap-3 mb-2.5 last:mb-0">
            <div className="w-5 h-5 bg-[#1a1a2e] text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</div>
            <p className="text-sm text-gray-600">{step}</p>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href={`/track?ref=${encodeURIComponent(ref)}`}
          className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-[#1a1a2e] text-[#1a1a2e] font-semibold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm"
        >
          Track Enquiry
        </Link>
        <Link
          href="/"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-[#1a1a2e] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#16213e] transition-colors text-sm"
        >
          Back to Home <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-24 pb-16 px-4">
        <Suspense fallback={<div className="text-center pt-20">Loading...</div>}>
          <SuccessContent />
        </Suspense>
      </main>
    </div>
  );
}

