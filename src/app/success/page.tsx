'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  CheckCircle2, Copy, Check, ArrowRight, Mail,
  Calendar, ShieldCheck, Sparkles, Search, ExternalLink,
  Flame, Clock
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
    setTimeout(() => setCopied(false), 2200);
  }

  return (
    <div className="max-w-2xl mx-auto animate-enter relative z-10">
      {/* Header celebratory icon */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-500 text-slate-950 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-emerald-500/20">
          <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold mb-3 shadow-lg shadow-emerald-950/40">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Submission Confirmed</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
          Project Enquiry Received
        </h1>

        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
          Your project discovery dossier has been recorded and safely assigned to the Cynbit solutions architecture triage queue.
        </p>
      </div>

      {/* Futuristic Ticket / Dossier Pass */}
      <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-800 shadow-2xl overflow-hidden mb-6 relative before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:bg-gradient-to-r before:from-cyan-400 via-sky-300 to-emerald-400">
        {/* Ticket Header */}
        <div className="bg-slate-950 p-6 sm:p-7 text-white relative overflow-hidden text-center border-b border-slate-850">
          <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 block mb-1">
            Official Enquiry Reference Identifier
          </span>

          <div className="text-3xl sm:text-4xl font-mono font-black text-cyan-400 tracking-wider my-3">
            {ref}
          </div>

          <button
            type="button"
            onClick={copyRef}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-200 border border-slate-700/80 transition-all hover:scale-105 cursor-pointer shadow-md"
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
          <div className="w-5 h-5 rounded-full bg-slate-950 -ml-6 border-r border-slate-800" />
          <div className="flex-1 border-t-2 border-dashed border-slate-800 mx-2" />
          <div className="w-5 h-5 rounded-full bg-slate-950 -mr-6 border-l border-slate-800" />
        </div>

        {/* Ticket Body Summary */}
        <div className="p-6 sm:p-7 space-y-4 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-slate-800/80 gap-1.5">
            <span className="text-slate-400 font-medium">Selected Strategic Objective</span>
            <span className="font-semibold text-white sm:text-right max-w-sm">{goal}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-slate-800/80 gap-1.5">
            <span className="text-slate-400 font-medium">Recommended Cynbit Squad</span>
            <span className="font-bold text-cyan-300 bg-cyan-950/70 border border-cyan-800/80 px-3 py-1 rounded-lg self-start sm:self-auto shadow-sm">
              {service}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
            <span className="text-slate-400 font-medium">Current Pipeline Status</span>
            <span className="font-bold font-mono text-cyan-300 bg-cyan-950/70 border border-cyan-800/80 px-3 py-1 rounded-full self-start sm:self-auto">
              New • Under Triage
            </span>
          </div>
        </div>
      </div>

      {/* Next Steps Timeline */}
      <div className="p-6 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 shadow-xl mb-6 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span>Expected Review & Response Process</span>
        </h3>

        <div className="space-y-3.5">
          {[
            {
              step: '1',
              title: 'Architectural Review',
              desc: 'A Cynbit solutions architect evaluates your technical requirements and sizing within 24 business hours.',
            },
            {
              step: '2',
              title: 'Consultation Outreach',
              desc: 'A dedicated engineering director contacts you via your preferred communication channel to confirm scope.',
            },
            {
              step: '3',
              title: 'Formal Solution & Sprint Roadmap',
              desc: 'You will receive an initial squad scope, milestone plan, and estimated delivery timeline.',
            },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-3.5">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-400 to-sky-400 text-slate-950 flex items-center justify-center text-[11px] font-black flex-shrink-0 mt-0.5 shadow-md shadow-cyan-500/20">
                {item.step}
              </div>
              <div>
                <p className="text-xs font-bold text-white">{item.title}</p>
                <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Primary Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link
          href={`/track?ref=${encodeURIComponent(ref)}`}
          className="w-full sm:w-1/2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-300 to-sky-400 hover:opacity-95 text-slate-950 text-xs font-black text-center flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/25 transform hover:-translate-y-0.5"
        >
          <Search className="w-3.5 h-3.5 text-slate-950" />
          <span>Monitor Review Progress</span>
        </Link>

        <Link
          href="/"
          className="w-full sm:w-1/2 py-3.5 px-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-white text-xs font-bold text-center flex items-center justify-center gap-2 transition-all"
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
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 relative selection:bg-cyan-500/20 selection:text-cyan-300 overflow-x-hidden">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 relative">
        {/* Atmospheric ambient glows */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-60 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 dark-grid-pattern opacity-30 pointer-events-none" />

        <Suspense
          fallback={
            <div className="max-w-xl mx-auto text-center pt-24 text-slate-400 text-xs flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-cyan-400/40 border-t-cyan-400 rounded-full animate-spin" />
              <span>Loading confirmation dossier...</span>
            </div>
          }
        >
          <SuccessContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
