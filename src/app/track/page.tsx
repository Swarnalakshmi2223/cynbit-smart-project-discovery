'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  Search, CheckCircle2, Clock, AlertCircle, ArrowRight,
  ShieldCheck, RefreshCw, Sparkles, Building, Copy, Check,
  ExternalLink, Layers, HelpCircle, Flame
} from 'lucide-react';
import Link from 'next/link';

const STATUS_STEPS = ['New', 'Under Review', 'Contacted', 'In Progress', 'Completed'];

const STATUS_CONFIG: Record<
  string,
  {
    label: string;
    badge: string;
    desc: string;
    sla: string;
    icon: React.ComponentType<{ className?: string }>;
  }
> = {
  New: {
    label: 'Received • Awaiting Triage',
    badge: 'bg-cyan-950/70 text-cyan-300 border-cyan-800/80 shadow-cyan-950/50',
    desc: 'Your project discovery submission is securely stored and queued for initial architectural evaluation by our engineering leads.',
    sla: 'Within 24 hours',
    icon: Clock,
  },
  'Under Review': {
    label: 'Under Active Review',
    badge: 'bg-amber-950/70 text-amber-300 border-amber-800/80 shadow-amber-950/50',
    desc: 'Our solutions architecture squad is analyzing technical feasibility, scope dependencies, and team allocation.',
    sla: 'Estimated 24–48 hours',
    icon: RefreshCw,
  },
  Contacted: {
    label: 'Contacted by Team',
    badge: 'bg-purple-950/70 text-purple-300 border-purple-800/80 shadow-purple-950/50',
    desc: 'A Cynbit solutions director has reached out via your preferred communication channel with discovery notes.',
    sla: 'Check your email/phone',
    icon: CheckCircle2,
  },
  'In Progress': {
    label: 'In Active Engagement',
    badge: 'bg-blue-950/70 text-blue-300 border-blue-800/80 shadow-blue-950/50',
    desc: 'Discovery sprint, scoping workshops, or contract milestone finalization are actively underway.',
    sla: 'Active Project Cycle',
    icon: Sparkles,
  },
  Completed: {
    label: 'Completed / Handed Over',
    badge: 'bg-emerald-950/70 text-emerald-300 border-emerald-800/80 shadow-emerald-950/50',
    desc: 'The project discovery assessment and technical scoping roadmap have been finalized and delivered.',
    sla: 'Milestone Achieved',
    icon: CheckCircle2,
  },
  Rejected: {
    label: 'Unfulfilled / Closed',
    badge: 'bg-rose-950/70 text-rose-300 border-rose-800/80 shadow-rose-950/50',
    desc: 'This project enquiry could not be progressed at this time. Please reach out to Cynbit leadership for further discussion.',
    sla: 'Closed',
    icon: AlertCircle,
  },
};

interface TrackResult {
  referenceId: string;
  projectGoal: string;
  recommendedService: string;
  status: string;
  priorityLevel?: string;
  submittedAt: string;
}

function TrackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRef = searchParams.get('ref') ?? '';

  const [refId, setRefId] = useState(initialRef);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TrackResult | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const fetchEnquiry = useCallback(
    async (code: string) => {
      const query = code.trim().toUpperCase();
      if (!query) return;

      setLoading(true);
      setError('');
      setResult(null);

      try {
        const res = await fetch(`/api/leads/track/${encodeURIComponent(query)}`);
        const json = await res.json();

        if (!res.ok) {
          setError(json.error ?? 'Enquiry could not be located. Please verify your reference identifier format.');
        } else {
          setResult(json.data);
          router.replace(`/track?ref=${encodeURIComponent(query)}`, { scroll: false });
        }
      } catch {
        setError('Network communication failed. Please check your internet connection and retry.');
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  // Auto-fetch if ref is provided in the URL query
  useEffect(() => {
    if (initialRef) {
      setRefId(initialRef.toUpperCase());
      fetchEnquiry(initialRef);
    }
  }, [initialRef, fetchEnquiry]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    fetchEnquiry(refId);
  }

  async function copyReference() {
    if (!result?.referenceId) return;
    await navigator.clipboard.writeText(result.referenceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }

  const currentStatus = result ? STATUS_CONFIG[result.status] || STATUS_CONFIG.New : null;
  const currentStepIndex = result ? STATUS_STEPS.indexOf(result.status) : -1;

  return (
    <div className="max-w-3xl mx-auto animate-enter relative z-10">
      {/* Header section with branding pills */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold mb-3.5 shadow-lg shadow-cyan-950/40">
          <Search className="w-3.5 h-3.5 text-cyan-400" />
          <span>Real-Time Status Portal</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
          Track Your Project Enquiry
        </h1>

        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
          Enter your unique reference identifier (e.g.{' '}
          <span className="font-mono font-bold text-cyan-300 bg-slate-900/90 px-2 py-0.5 rounded border border-cyan-500/30">
            CYN-2026-XXXXXXX
          </span>
          ) to monitor your review progress in real time.
        </p>

        {/* Feature trust markers */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-4 text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>24h Architectural Triage</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Live MongoDB Sync</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Encrypted Dossier Access</span>
          </span>
        </div>
      </div>

      {/* Modern Dark Glass Search Card */}
      <form
        onSubmit={handleSearch}
        className="bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-800 shadow-2xl p-4 sm:p-6 mb-8 relative before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-cyan-400 before:to-transparent before:rounded-t-2xl"
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 font-mono text-sm">
              <Search className="w-4 h-4 text-slate-500" />
            </div>
            <input
              type="text"
              value={refId}
              onChange={(e) => setRefId(e.target.value.toUpperCase())}
              placeholder="e.g. CYN-2026-TWTSWQ7"
              className="w-full bg-slate-950/80 rounded-xl border border-slate-700/80 pl-11 pr-4 py-3.5 text-sm font-mono tracking-wider uppercase text-white placeholder:text-slate-500 placeholder:tracking-normal focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !refId.trim()}
            className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-300 to-sky-400 hover:opacity-95 text-slate-950 text-xs font-black shadow-lg shadow-cyan-500/20 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50 disabled:transform-none cursor-pointer"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                <span>Searching Dossier...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4 text-slate-950" />
                <span>Inspect Status</span>
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs font-medium flex items-center gap-2.5 animate-enter">
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </form>

      {/* Query Result Dossier Card */}
      {result && currentStatus && (
        <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-800 shadow-2xl overflow-hidden mb-8 relative animate-enter before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:bg-gradient-to-r before:from-cyan-500 via-sky-400 to-blue-500">
          {/* Header Banner */}
          <div className="bg-slate-950 p-6 sm:p-7 border-b border-slate-800/80 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
                  Active Enquiry Dossier
                </span>
                {result.priorityLevel && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/60 inline-flex items-center gap-1">
                    <Flame className="w-3 h-3 text-cyan-400" />
                    {result.priorityLevel} Priority
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-2xl sm:text-3xl font-mono font-black text-cyan-400 tracking-wider">
                  {result.referenceId}
                </span>

                <button
                  type="button"
                  onClick={copyReference}
                  title="Copy Reference ID"
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white transition-all"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-cyan-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:items-end gap-1.5 self-start sm:self-auto">
              <span
                className={`text-xs font-mono font-bold px-3.5 py-1.5 rounded-full border shadow-sm ${currentStatus.badge}`}
              >
                {result.status}
              </span>
              <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                <Clock className="w-3 h-3 text-slate-500" />
                <span>SLA: {currentStatus.sla}</span>
              </span>
            </div>
          </div>

          {/* Interactive Lifecycle Visualizer */}
          <div className="p-6 sm:p-7 border-b border-slate-800/80 bg-slate-950/40">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>Lifecycle Pipeline Progress</span>
              </h4>
              <span className="text-[11px] font-mono text-cyan-400 font-semibold">
                {currentStepIndex >= 0 ? `Stage ${currentStepIndex + 1} of ${STATUS_STEPS.length}` : 'Evaluating'}
              </span>
            </div>

            {/* Stepper with connecting line */}
            <div className="relative mb-6 pt-2">
              <div className="absolute top-[19px] left-6 right-6 h-0.5 bg-slate-800 hidden sm:block z-0" />

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-2 text-center relative z-10">
                {STATUS_STEPS.map((stepName, idx) => {
                  const isPassed = currentStepIndex >= idx;
                  const isCurrent = currentStepIndex === idx;

                  return (
                    <div
                      key={stepName}
                      className={`flex flex-col items-center p-2 rounded-xl transition-all ${
                        isCurrent
                          ? 'bg-slate-900/90 border border-cyan-500/40 shadow-lg shadow-cyan-950/40'
                          : 'bg-transparent'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-2 transition-all ${
                          isPassed
                            ? 'bg-gradient-to-tr from-cyan-400 to-sky-400 text-slate-950 font-black shadow-md shadow-cyan-500/30'
                            : 'bg-slate-800 border border-slate-700 text-slate-500'
                        } ${isCurrent ? 'ring-4 ring-cyan-500/25 ring-offset-2 ring-offset-slate-950' : ''}`}
                      >
                        {isPassed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                      </div>

                      <span
                        className={`text-xs font-semibold leading-tight ${
                          isCurrent ? 'text-cyan-300 font-bold' : isPassed ? 'text-slate-200' : 'text-slate-500'
                        }`}
                      >
                        {stepName}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stage Detailed Assessment Box */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/90 text-xs text-slate-300 leading-relaxed flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center flex-shrink-0 mt-0.5 text-cyan-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-white block mb-0.5">
                  Current Stage: {currentStatus.label}
                </span>
                <p className="text-slate-400 leading-relaxed">{currentStatus.desc}</p>
              </div>
            </div>
          </div>

          {/* Enquiry Key Attributes Grid */}
          <div className="p-6 sm:p-7 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-slate-800/80 gap-1.5">
              <span className="text-slate-400 font-medium">Selected Strategic Objective</span>
              <span className="font-semibold text-white sm:text-right max-w-sm">
                {result.projectGoal}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-slate-800/80 gap-1.5">
              <span className="text-slate-400 font-medium">Recommended Cynbit Squad</span>
              <span className="font-bold text-cyan-300 bg-cyan-950/70 border border-cyan-800/80 px-3 py-1 rounded-lg self-start sm:self-auto shadow-sm">
                {result.recommendedService}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
              <span className="text-slate-400 font-medium">Submission Timestamp</span>
              <span className="font-mono text-slate-300">
                {new Date(result.submittedAt).toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Quick Help & Next Step Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-850 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h4 className="text-xs font-bold text-white">Need another project assessment?</h4>
          </div>
          <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">
            Run an additional scope diagnosis for a new mobile app, cloud migration, or AI workflow.
          </p>
          <Link
            href="/discovery"
            className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>Start a New Discovery</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-850 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <Building className="w-4 h-4 text-sky-400" />
            <h4 className="text-xs font-bold text-white">Connect with Cynbit directly</h4>
          </div>
          <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">
            Have urgent requirements or enterprise RFPs? Contact our solutions engineering team directly.
          </p>
          <a
            href="https://www.cynbit.in/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold text-sky-400 hover:text-sky-300 transition-colors"
          >
            <span>Cynbit Contact Desk</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function TrackPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 relative selection:bg-cyan-500/20 selection:text-cyan-300 overflow-x-hidden">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 relative">
        {/* Atmospheric background glows */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-60 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 dark-grid-pattern opacity-30 pointer-events-none" />

        <Suspense
          fallback={
            <div className="max-w-3xl mx-auto text-center pt-24 text-slate-400 text-xs flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-cyan-400/40 border-t-cyan-400 rounded-full animate-spin" />
              <span>Loading Real-Time Status Portal...</span>
            </div>
          }
        >
          <TrackContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
