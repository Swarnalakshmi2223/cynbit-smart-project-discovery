'use client';

import { DiscoveryFormData, BudgetRange, ExpectedTimeline } from '@/types';
import { BUDGET_RANGES, EXPECTED_TIMELINES } from '@/constants';
import { Coins, Calendar, Sparkles, Check, AlertCircle } from 'lucide-react';

interface Props {
  data: DiscoveryFormData;
  onChange: <K extends keyof DiscoveryFormData>(k: K, v: DiscoveryFormData[K]) => void;
  errors: Record<string, string>;
}

export default function Step4Budget({ data, onChange, errors }: Props) {
  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
          Commercial Parameters & Delivery Timeline
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
          Select realistic brackets so our deterministic engine can size squad composition, architecture tier, and sprint velocity.
        </p>
      </div>

      {/* Budget Range Section */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5 flex items-center gap-1.5">
          <Coins className="w-3.5 h-3.5 text-cyan-400" />
          <span>Estimated Budget Allocation (INR)</span>
          <span className="text-cyan-400">*</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {BUDGET_RANGES.map((range) => {
            const isSelected = data.budgetRange === range;
            return (
              <button
                key={range}
                type="button"
                onClick={() => onChange('budgetRange', range as BudgetRange)}
                className={`p-3.5 rounded-xl text-left border transition-all text-xs sm:text-sm font-semibold flex items-center justify-between group ${
                  isSelected
                    ? 'border-cyan-500 bg-cyan-950/40 text-white ring-1 ring-cyan-500 shadow-lg shadow-cyan-950/50'
                    : 'border-slate-800 bg-slate-950/70 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60 hover:text-white'
                }`}
              >
                <span className="font-mono">{range}</span>
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-400 text-slate-950'
                      : 'border-slate-700 bg-slate-900 group-hover:border-slate-600'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>

        {errors.budgetRange && (
          <p className="mt-2 text-xs text-rose-400 flex items-center gap-1.5 font-medium">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{errors.budgetRange}</span>
          </p>
        )}
      </div>

      {/* Timeline Section */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
          <span>Target Delivery Schedule</span>
          <span className="text-cyan-400">*</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {EXPECTED_TIMELINES.map((time) => {
            const isSelected = data.expectedTimeline === time;
            return (
              <button
                key={time}
                type="button"
                onClick={() => onChange('expectedTimeline', time as ExpectedTimeline)}
                className={`p-3.5 rounded-xl text-left border transition-all text-xs sm:text-sm font-semibold flex items-center justify-between group ${
                  isSelected
                    ? 'border-cyan-500 bg-cyan-950/40 text-white ring-1 ring-cyan-500 shadow-lg shadow-cyan-950/50'
                    : 'border-slate-800 bg-slate-950/70 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60 hover:text-white'
                }`}
              >
                <span>{time}</span>
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-400 text-slate-950'
                      : 'border-slate-700 bg-slate-900 group-hover:border-slate-600'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>

        {errors.expectedTimeline && (
          <p className="mt-2 text-xs text-rose-400 flex items-center gap-1.5 font-medium">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{errors.expectedTimeline}</span>
          </p>
        )}
      </div>

      {/* Discovery engine notice */}
      <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/50 flex items-start gap-3">
        <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-cyan-200/90 leading-relaxed font-normal">
          Clicking <strong className="text-white font-bold">Continue</strong> runs your answers through our multi-vector scoring algorithm to generate your tailored service blueprint and qualification rating.
        </p>
      </div>
    </div>
  );
}
