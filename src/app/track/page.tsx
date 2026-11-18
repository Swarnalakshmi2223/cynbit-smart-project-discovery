'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  Search, CheckCircle2, Clock, AlertCircle, ArrowRight,
  ShieldCheck, RefreshCw, Calendar, Sparkles, Building
} from 'lucide-react';
import Link from 'next/link';

const STATUS_STEPS = ['New', 'Under Review', 'Contacted', 'In Progress', 'Completed'];

const STATUS_CONFIG: Record<
  string,
  { label: string; badge: string; desc: string; icon: React.ComponentType<{ className?: string }> }
> = {
  New: {
    label: 'Received • Awaiting Review',
    badge: 'bg-blue-50 text-blue-700 border-blue-200',
    desc: 'Your project discovery submission is logged and scheduled for initial architectural assessment.',
    icon: Clock,
  },
  'Under Review': {
    label: 'Under Active Review',
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
    desc: 'Our engineering solutions team is reviewing the technical feasibility, timeline, and squad requirements.',
    icon: RefreshCw,
  },
  Contacted: {
    label: 'Contacted by Team',
    badge: 'bg-purple-50 text-purple-700 border-purple-200',
    desc: 'A Cynbit representative has initiated outreach via your preferred communication method.',
    icon: CheckCircle2,
  },
  'In Progress': {
    label: 'In Active Engagement',
    badge: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    desc: 'Scope refinement, technical discovery sessions, or sprint planning are underway.',
    icon: Sparkles,
  },
  Completed: {
    label: 'Completed / Handed Over',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    desc: 'The project discovery and initial advisory engagement has successfully concluded.',
    icon: CheckCircle2,
  },
  Rejected: {
    label: 'Unfulfilled / Closed',
    badge: 'bg-rose-50 text-rose-700 border-rose-200',
    desc: 'This enquiry could not be progressed at this time. Please contact Cynbit directly for alternative options.',
    icon: AlertCircle,
  },
};

function TrackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [refId, setRefId] = useState(searchParams.get('ref') ?? '');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | Record<string, string>>(null);
  const [error, setError] = useState('');

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const query = refId.trim().toUpperCase();
    if (!query) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch(`/api/leads/track/${encodeURIComponent(query)}`);
      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? 'Enquiry could not be located. Please verify your reference format.');
      } else {
        setResult(json.data);
        router.replace(`/track?ref=${encodeURIComponent(query)}`, { scroll: false });
      }
    } catch {
      setError('Network communication failed. Please retry.');
    } finally {
      setLoading(false);
    }
  }

  const currentStatus = result ? STATUS_CONFIG[result.status] || STATUS_CONFIG.New : null;
  const currentStepIndex = result ? STATUS_STEPS.indexOf(result.status) : -1;

  return (
    <div className="max-w-2xl mx-auto animate-enter">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold mb-3">
          <Search className="w-3.5 h-3.5 text-cyan-600" />
          <span>Real-Time Status Portal</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Track Your Project Enquiry
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
          Enter your unique reference identifier (e.g. <span className="font-mono font-bold text-slate-700">CYN-2026-XXXXXXX</span>) to monitor your review progress.
        </p>
      </div>

      {/* Search Input Card */}
      <form onSubmit={handleSearch} className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-md mb-8">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={refId}
              onChange={(e) => setRefId(e.target.value.toUpperCase())}
              placeholder="e.g. CYN-2026-TWTSWQ7"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-mono tracking-wider uppercase text-slate-900 placeholder:text-slate-400 placeholder:tracking-normal focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !refId.trim()}
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Searching...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4 text-cyan-400" />
                <span>Inspect Status</span>
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="mt-3 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </form>

      {/* Query Result Card */}
      {result && currentStatus && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden animate-enter">
          {/* Header Banner */}
          <div className="bg-slate-950 p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 block mb-0.5">
                Active Tracking Dossier
              </span>
              <div className="text-xl sm:text-2xl font-mono font-black text-cyan-400">
                {result.referenceId}
              </div>
            </div>

            <span
              className={`text-xs font-bold font-mono px-3 py-1 rounded-full border self-start sm:self-auto ${currentStatus.badge}`}
            >
              {result.status}
            </span>
          </div>

          {/* Timeline Visualizer */}
          <div className="p-6 sm:p-7 border-b border-slate-100 bg-slate-50/50">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4">
              Lifecycle Stage
            </h4>

            <div className="grid grid-cols-5 gap-2 text-center">
              {STATUS_STEPS.map((s, idx) => {
                const isPassed = currentStepIndex >= idx;
                const isCurrent = currentStepIndex === idx;

                return (
                  <div key={s} className="flex flex-col items-center">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold mb-1.5 transition-all ${
                        isPassed
                          ? 'bg-slate-900 text-cyan-400 shadow-xs'
                          : 'bg-slate-200 text-slate-400'
                      } ${isCurrent ? 'ring-4 ring-cyan-100' : ''}`}
                    >
                      {isPassed ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                    </div>
                    <span
                      className={`text-[10px] font-semibold leading-tight line-clamp-1 ${
                        isCurrent ? 'text-slate-900 font-bold' : 'text-slate-400'
                      }`}
                    >
                      {s}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 p-3 rounded-xl bg-white border border-slate-200/80 text-xs text-slate-600 leading-relaxed">
              <span className="font-bold text-slate-800 block mb-0.5">Current Stage Assessment</span>
              {currentStatus.desc}
            </div>
          </div>

          {/* Enquiry Attributes */}
          <div className="p-6 sm:p-7 space-y-3.5 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Selected Objective</span>
              <span className="font-semibold text-slate-900 text-right max-w-xs">{result.projectGoal}</span>
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Recommended Squad</span>
              <span className="font-bold text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-md border border-cyan-200/80">
                {result.recommendedService}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Logged Timestamp</span>
              <span className="font-mono text-slate-700">
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

      {/* Help Footer */}
      <div className="mt-8 text-center text-xs text-slate-500 space-y-2">
        <p>Need to submit an additional initiative?</p>
        <Link
          href="/discovery"
          className="inline-flex items-center gap-1.5 font-bold text-cyan-700 hover:text-cyan-800 underline underline-offset-4"
        >
          <span>Start a new Project Discovery</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

export default function TrackPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-cyan-500/20 selection:text-cyan-900">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-4 relative">
        <Suspense fallback={<div className="text-center pt-20 text-xs text-slate-400">Loading tracker...</div>}>
          <TrackContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
