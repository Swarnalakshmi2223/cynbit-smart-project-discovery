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
    <div className="mb-10">
      {/* Top indicator count and title */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded-full border border-cyan-200">
            Phase {currentStep} of {totalSteps}
          </span>
          <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
            • {steps[currentStep - 1]?.title}
          </span>
        </div>
        <span className="text-xs font-mono font-bold text-slate-500">
          {percentage}% Complete
        </span>
      </div>

      {/* Modern thin progress track with glowing fill */}
      <div className="h-2 w-full bg-slate-200/80 rounded-full overflow-hidden p-0.5 relative">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 rounded-full transition-all duration-500 ease-out shadow-sm"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Step nodes row */}
      <div className="hidden sm:grid grid-cols-5 gap-2 mt-4">
        {steps.map((st) => {
          const isDone = st.id < currentStep;
          const isCurrent = st.id === currentStep;

          return (
            <div key={st.id} className="flex flex-col items-center text-center">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 mb-1.5 ${
                  isDone
                    ? 'bg-slate-900 text-cyan-400 shadow-sm'
                    : isCurrent
                    ? 'bg-cyan-500 text-white ring-4 ring-cyan-100 shadow-md'
                    : 'bg-slate-100 text-slate-400 border border-slate-200'
                }`}
              >
                {isDone ? <Check className="w-3.5 h-3.5" /> : st.id}
              </div>
              <span
                className={`text-[11px] font-semibold tracking-tight leading-tight line-clamp-1 ${
                  isCurrent ? 'text-slate-900 font-bold' : isDone ? 'text-slate-600' : 'text-slate-400'
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
