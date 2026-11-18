'use client';

import { RecommendationResult } from '@/types';
import {
  Sparkles, ShieldCheck, CheckCircle2, ArrowRight,
  TrendingUp, Award, Layers, HelpCircle
} from 'lucide-react';

interface Props {
  recommendation: RecommendationResult;
}

const PRIORITY_THEMES = {
  High: {
    badge: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    bar: 'from-rose-500 to-amber-500',
    tag: 'High Priority Stream',
  },
  Medium: {
    badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    bar: 'from-amber-500 to-cyan-500',
    tag: 'Accelerated Stream',
  },
  Low: {
    badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    bar: 'from-emerald-500 to-teal-500',
    tag: 'Standard Advisory Stream',
  },
};

export default function RecommendationCard({ recommendation }: Props) {
  const { recommendedService, reason, priorityScore, priorityLevel, nextStep } = recommendation;
  const theme = PRIORITY_THEMES[priorityLevel] || PRIORITY_THEMES.Medium;

  return (
    <div className="space-y-5 animate-enter">
      {/* Top Banner Tag */}
      <div className="text-center max-w-md mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100/70 border border-cyan-300/60 text-cyan-900 text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
          <span>Intelligent Service Diagnosis</span>
        </div>
        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
          Recommended Engineering Engagement
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Synthesized from your project scope, timeline, and architectural requirements.
        </p>
      </div>

      {/* Main Dossier Card */}
      <div className="relative rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-6 sm:p-7 shadow-xl border border-slate-800 overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold block mb-1">
                Suggested Cynbit Offering
              </span>
              <h4 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-tight">
                {recommendedService}
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-bold font-mono px-3 py-1 rounded-full border ${theme.badge}`}
              >
                {priorityLevel} Priority
              </span>
            </div>
          </div>

          {/* Priority Score Progress Gauge */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 mb-5">
            <div className="flex items-center justify-between text-xs font-semibold mb-2">
              <span className="text-slate-400 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                <span>Deterministic Qualification Score</span>
              </span>
              <span className="font-mono text-cyan-400 font-bold text-sm">
                {priorityScore} / 100
              </span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden p-0.5">
              <div
                className={`h-full bg-gradient-to-r ${theme.bar} rounded-full transition-all duration-700`}
                style={{ width: `${priorityScore}%` }}
              />
            </div>
          </div>

          {/* Technical Rationale */}
          <div className="space-y-3 text-xs leading-relaxed text-slate-300">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/60">
              <span className="font-bold text-white block mb-1">Why this alignment?</span>
              <p>{reason}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-cyan-200">
              <span className="font-bold text-cyan-300 block mb-1 flex items-center gap-1.5">
                <ArrowRight className="w-3.5 h-3.5" />
                <span>Next Immediate Step</span>
              </span>
              <p>{nextStep}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-[11px] text-center text-slate-400 font-normal">
        * Recommendations are architectural guidance suggestions and do not constitute a binding quotation.
      </p>
    </div>
  );
}
