// src/components/discovery/Step1Goal.tsx
import { ProjectGoal } from '@/types';
import { PROJECT_GOALS } from '@/constants';
import { Bot, Smartphone, Globe, Cloud, TrendingUp, Building2, Cpu, HelpCircle } from 'lucide-react';

const GOAL_ICONS: Record<ProjectGoal, React.ComponentType<{ className?: string }>> = {
  'Build a new web application': Globe,
  'Develop a mobile application': Smartphone,
  'Automate business operations using AI': Bot,
  'Develop an AI-powered solution': Cpu,
  'Migrate or improve cloud infrastructure': Cloud,
  'Improve website performance and SEO': TrendingUp,
  'Develop custom enterprise software': Building2,
  'Other': HelpCircle,
};

interface Props {
  value: ProjectGoal | '';
  onChange: (v: ProjectGoal) => void;
  error?: string;
}

export default function Step1Goal({ value, onChange, error }: Props) {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-6">Select the option that best describes your primary objective.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PROJECT_GOALS.map(goal => {
          const Icon = GOAL_ICONS[goal];
          const selected = value === goal;
          return (
            <button
              key={goal}
              type="button"
              onClick={() => onChange(goal)}
              className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                selected
                  ? 'border-[#0ea5e9] bg-[#f0f9ff]'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
              aria-pressed={selected}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${selected ? 'bg-[#0ea5e9]' : 'bg-gray-100'}`}>
                <Icon className={`w-4 h-4 ${selected ? 'text-white' : 'text-gray-500'}`} />
              </div>
              <span className={`text-sm font-medium leading-snug ${selected ? 'text-[#0ea5e9]' : 'text-gray-700'}`}>
                {goal}
              </span>
            </button>
          );
        })}
      </div>
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </div>
  );
}

