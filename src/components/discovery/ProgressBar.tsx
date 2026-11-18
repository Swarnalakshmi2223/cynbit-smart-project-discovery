'use client';

import { Check } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description?: string;
}

interface Props {
  currentStep: number;
  totalSteps: number;
  steps: Step[];
}

export default function ProgressBar({ currentStep, totalSteps, steps }: Props) {
  const percentage = Math.round(((currentStep - 1) / (totalSteps - 1)) * 100);

  return (
    <div className="mb-8">
      {/* Top indicator count and title */}
      <div className="flex items-center justify-between mb-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/70 px-2.5 py-1 rounded-full border border-cyan-800/60">
            Phase 0{currentStep} of 0{totalSteps}
          </span>
          <span className="font-semibold text-slate-300 hidden sm:inline">
            — {steps[currentStep - 1]?.title}
          </span>
        </div>
        <span className="font-mono font-bold text-cyan-400">
          {percentage}% Complete
        </span>
      </div>

      {/* Modern thin progress track with glowing fill */}
      <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden p-0 relative border border-slate-800">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-500 rounded-full transition-all duration-500 ease-out shadow-lg shadow-cyan-500/50"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Step nodes row */}
      <div className="hidden sm:grid grid-cols-5 gap-2 mt-4">
        {steps.map((st) => {
          const isDone = st.id < currentStep;
          const isCurrent = st.id === currentStep;

          return (
            <div key={st.id} className="flex flex-col items-center text-center group">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 mb-1.5 ${
                  isDone
                    ? 'bg-slate-900 text-cyan-400 border border-cyan-500/50 shadow-sm'
                    : isCurrent
                    ? 'bg-cyan-500 text-slate-950 font-black ring-4 ring-cyan-500/20 shadow-md shadow-cyan-500/30'
                    : 'bg-slate-900/60 text-slate-600 border border-slate-800'
                }`}
              >
                {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : st.id}
              </div>
              <span
                className={`text-[11px] font-semibold tracking-tight leading-tight line-clamp-1 ${
                  isCurrent ? 'text-white font-bold' : isDone ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                {st.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
