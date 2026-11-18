// src/components/discovery/ProgressBar.tsx
import { Check } from 'lucide-react';

interface Step { id: number; title: string; }
interface Props { currentStep: number; totalSteps: number; steps: Step[]; }

export default function ProgressBar({ currentStep, totalSteps, steps }: Props) {
  const percent = ((currentStep - 1) / (totalSteps - 1)) * 100;
  return (
    <div className="mb-8">
      {/* Step indicators */}
      <div className="flex items-center justify-between mb-4 relative">
        {/* Track */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-10" />
        <div
          className="absolute top-4 left-0 h-0.5 bg-[#0ea5e9] -z-10 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
        {steps.map(({ id, title }) => {
          const done = id < currentStep;
          const active = id === currentStep;
          return (
            <div key={id} className="flex flex-col items-center gap-1.5">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                  done
                    ? 'bg-[#0ea5e9] border-[#0ea5e9] text-white'
                    : active
                    ? 'bg-white border-[#1a1a2e] text-[#1a1a2e]'
                    : 'bg-white border-gray-300 text-gray-400'
                }`}
              >
                {done ? <Check className="w-4 h-4" /> : id}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${active ? 'text-[#1a1a2e]' : done ? 'text-[#0ea5e9]' : 'text-gray-400'}`}>
                {title}
              </span>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-center text-gray-400">
        Step {currentStep} of {totalSteps}
      </p>
    </div>
  );
}

