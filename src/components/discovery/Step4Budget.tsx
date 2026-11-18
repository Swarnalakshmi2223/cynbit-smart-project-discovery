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
        <h3 className="text-lg font-bold text-slate-900">Commercial parameters & delivery timeline</h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Select realistic brackets so we can suggest appropriate squad composition and sprint structures.
        </p>
      </div>

      {/* Budget Range Section */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5 flex items-center gap-1.5">
          <Coins className="w-3.5 h-3.5 text-slate-500" />
          <span>Estimated Budget Allocation</span>
          <span className="text-cyan-600">*</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {BUDGET_RANGES.map((range) => {
            const isSelected = data.budgetRange === range;
            return (
              <button
                key={range}
                type="button"
                onClick={() => onChange('budgetRange', range as BudgetRange)}
                className={`p-3 rounded-xl text-left border transition-all text-xs font-semibold flex items-center justify-between ${
                  isSelected
                    ? 'border-cyan-500 bg-cyan-50/50 text-slate-900 ring-1 ring-cyan-500 shadow-sm'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <span>{range}</span>
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    isSelected ? 'border-cyan-600 bg-cyan-600 text-white' : 'border-slate-300'
                  }`}
                >
                  {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>

        {errors.budgetRange && (
          <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
            <AlertCircle className="w-3 h-3" /> {errors.budgetRange}
          </p>
        )}
      </div>

      {/* Timeline Section */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          <span>Expected Delivery Timeline</span>
          <span className="text-cyan-600">*</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {EXPECTED_TIMELINES.map((time) => {
            const isSelected = data.expectedTimeline === time;
            return (
              <button
                key={time}
                type="button"
                onClick={() => onChange('expectedTimeline', time as ExpectedTimeline)}
                className={`p-3 rounded-xl text-left border transition-all text-xs font-semibold flex items-center justify-between ${
                  isSelected
                    ? 'border-cyan-500 bg-cyan-50/50 text-slate-900 ring-1 ring-cyan-500 shadow-sm'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <span>{time}</span>
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    isSelected ? 'border-cyan-600 bg-cyan-600 text-white' : 'border-slate-300'
                  }`}
                >
                  {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>

        {errors.expectedTimeline && (
          <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
            <AlertCircle className="w-3 h-3" /> {errors.expectedTimeline}
          </p>
        )}
      </div>

      {/* Discovery engine notice */}
      <div className="p-3.5 rounded-xl bg-gradient-to-r from-cyan-50 to-sky-50 border border-cyan-200/80 flex items-start gap-3">
        <Sparkles className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-slate-600 leading-relaxed font-medium">
          Once you click <strong>Continue</strong>, our deterministic scoring engine will synthesize your requirements and reveal your tailored service diagnosis.
        </p>
      </div>
    </div>
  );
}
