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
    badge: 'bg-rose-500/15 text-rose-300 border-rose-500/30 ring-rose-500/20',
    bar: 'from-rose-500 via-amber-500 to-amber-400',
    tag: 'High Priority Stream',
  },
  Medium: {
    badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30 ring-amber-500/20',
    bar: 'from-amber-500 via-cyan-500 to-sky-400',
    tag: 'Accelerated Stream',
  },
  Low: {
    badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 ring-emerald-500/20',
    bar: 'from-emerald-500 via-teal-500 to-cyan-400',
    tag: 'Standard Advisory Stream',
  },
};

export default function RecommendationCard({ recommendation }: Props) {
  const { recommendedService, reason, priorityScore, priorityLevel, nextStep } = recommendation;
  const theme = PRIORITY_THEMES[priorityLevel] || PRIORITY_THEMES.Medium;

  return (
    <div className="space-y-6 animate-enter">
      {/* Top Banner Tag */}
      <div className="text-center max-w-md mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold mb-2.5 shadow-lg shadow-cyan-950/50">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Deterministic Service Synthesis</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          Recommended Engineering Engagement
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
          Synthesized directly from your project goals, technical scope, timeline, and industry profile.
        </p>
      </div>

      {/* Main Dossier Card */}
      <div className="relative rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-6 sm:p-7 shadow-2xl border border-slate-800 overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-bold block mb-1">
                Suggested Cynbit Offering
              </span>
              <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                {recommendedService}
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-bold font-mono px-3.5 py-1 rounded-full border ring-1 ${theme.badge}`}
              >
                {priorityLevel} Priority
              </span>
            </div>
          </div>

          {/* Priority Score Progress Gauge */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 mb-5">
            <div className="flex items-center justify-between text-xs font-semibold mb-2">
              <span className="text-slate-400 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                <span>Deterministic Qualification Score</span>
              </span>
              <span className="font-mono text-cyan-400 font-bold text-sm">
                {priorityScore} / 100
              </span>
            </div>
            <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div
                className={`h-full bg-gradient-to-r ${theme.bar} rounded-full transition-all duration-700 shadow-md shadow-cyan-500/40`}
                style={{ width: `${priorityScore}%` }}
              />
            </div>
          </div>

          {/* Technical Rationale */}
          <div className="space-y-3.5 text-xs sm:text-sm leading-relaxed text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="font-bold text-white block mb-1 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>Why this alignment?</span>
              </span>
              <p className="text-slate-300 leading-relaxed">{reason}</p>
            </div>

            <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/50 text-cyan-200">
              <span className="font-bold text-cyan-300 block mb-1 flex items-center gap-1.5">
                <ArrowRight className="w-3.5 h-3.5" />
                <span>Recommended Next Step</span>
              </span>
              <p className="leading-relaxed">{nextStep}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Verification footer */}
      <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 font-mono">
        <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
        <span>Architectural guidance blueprint • Transmitted with your submission</span>
      </div>
    </div>
  );
}
