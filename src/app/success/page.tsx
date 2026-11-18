'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  CheckCircle2, Copy, Check, ArrowRight, Mail,
  Calendar, ShieldCheck, Sparkles, Search, ExternalLink
} from 'lucide-react';

function SuccessContent() {
  const params = useSearchParams();
  const ref = params.get('ref') ?? 'CYN-2026-UNKNOWN';
  const goal = params.get('goal') ?? '';
  const service = params.get('service') ?? '';
  const emailStatus = params.get('email') ?? 'unknown';
  const [copied, setCopied] = useState(false);

  async function copyRef() {
    await navigator.clipboard.writeText(ref);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div className="max-w-xl mx-auto animate-enter">
      {/* Header celebratory icon */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/25">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-2">
          <span>Submission Confirmed</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Project Enquiry Received
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
          Your project dossier has been securely recorded and queued for architectural review.
        </p>
      </div>

      {/* Futuristic Ticket / Dossier Pass */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden mb-6">
        {/* Ticket Header */}
        <div className="bg-slate-950 p-6 sm:p-7 text-white relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

          <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 block mb-1">
            Enquiry Reference Identifier
          </span>

          <div className="text-2xl sm:text-3xl font-mono font-black text-cyan-400 tracking-wider my-2">
            {ref}
          </div>

          <button
            type="button"
            onClick={copyRef}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-xs font-semibold text-slate-200 border border-slate-700 transition-all hover:scale-105"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Reference Copied to Clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-cyan-400" />
                <span>Copy Reference ID</span>
              </>
            )}
          </button>
        </div>

        {/* Ticket Cutout border design */}
        <div className="relative flex items-center justify-between px-4 -my-2.5 z-10 pointer-events-none">
          <div className="w-5 h-5 rounded-full bg-slate-50 -ml-6 border-r border-slate-200" />
          <div className="flex-1 border-t-2 border-dashed border-slate-200 mx-2" />
          <div className="w-5 h-5 rounded-full bg-slate-50 -mr-6 border-l border-slate-200" />
        </div>

        {/* Ticket Body Summary */}
        <div className="p-6 sm:p-7 space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-slate-500 font-medium">Selected Objective</span>
            <span className="font-semibold text-slate-900 text-right max-w-xs">{goal}</span>
          </div>

          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-slate-500 font-medium">Recommended Squad</span>
            <span className="font-bold text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-md border border-cyan-200/80">
              {service}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">Initial Status</span>
            <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
              New • Under Review
            </span>
          </div>
        </div>
      </div>

      {/* Next Steps Timeline */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm mb-6 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
          Expected Review Process
        </h3>

        {[
          { step: '1', title: 'Technical Review', desc: 'A Cynbit solutions architect assesses your technical requirements within 24 business hours.' },
          { step: '2', title: 'Consultation Scheduling', desc: 'A dedicated representative will contact you via your chosen communication channel.' },
          { step: '3', title: 'Architecture Proposal', desc: 'You will receive an initial squad scope, milestone plan, and cost estimate.' },
        ].map((item) => (
          <div key={item.step} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-slate-900 text-cyan-400 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
              {item.step}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">{item.title}</p>
              <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link
          href={`/track?ref=${encodeURIComponent(ref)}`}
          className="w-full sm:w-1/2 py-3 px-4 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white hover:bg-slate-50 text-center flex items-center justify-center gap-1.5 transition-all shadow-xs"
        >
          <Search className="w-3.5 h-3.5 text-slate-500" />
          <span>Monitor This Enquiry</span>
        </Link>

        <Link
          href="/"
          className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold text-center flex items-center justify-center gap-1.5 transition-all shadow-md"
        >
          <span>Return to Homepage</span>
          <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-cyan-500/20 selection:text-cyan-900">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-4 relative">
        <Suspense fallback={<div className="text-center pt-20 text-xs text-slate-400">Loading confirmation...</div>}>
          <SuccessContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
