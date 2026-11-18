'use client';

import { ProjectGoal } from '@/types';
import { PROJECT_GOALS } from '@/constants';
import {
  Bot, Smartphone, Globe, Cloud, TrendingUp,
  Building2, Cpu, HelpCircle, CheckCircle2
} from 'lucide-react';

const GOAL_META: Record<
  ProjectGoal,
  { icon: React.ComponentType<{ className?: string }>; badge: string; desc: string }
> = {
  'Build a new web application': {
    icon: Globe,
    badge: 'Frontend & Full-Stack',
    desc: 'Modern responsive web platforms, portals, and SaaS software.',
  },
  'Develop a mobile application': {
    icon: Smartphone,
    badge: 'iOS & Android',
    desc: 'Native or cross-platform mobile apps built for scale and retention.',
  },
  'Automate business operations using AI': {
    icon: Bot,
    badge: 'Intelligent Workflows',
    desc: 'Automate high-friction back-office pipelines with AI workflows.',
  },
  'Develop an AI-powered solution': {
    icon: Cpu,
    badge: 'Custom Machine Learning',
    desc: 'Integrate LLMs, computer vision, or predictive data algorithms.',
  },
  'Migrate or improve cloud infrastructure': {
    icon: Cloud,
    badge: 'Cloud & DevOps',
    desc: 'AWS, Azure, containerization, and high-availability architecture.',
  },
  'Improve website performance and SEO': {
    icon: TrendingUp,
    badge: 'Growth & Vitals',
    desc: 'Accelerate Core Web Vitals, organic search ranks, and UX speed.',
  },
  'Develop custom enterprise software': {
    icon: Building2,
    badge: 'Enterprise Architecture',
    desc: 'High-compliance bespoke software for complex organizational workflows.',
  },
  'Other': {
    icon: HelpCircle,
    badge: 'Advisory Consultation',
    desc: 'Technical consultation, architecture reviews, or specialized scope.',
  },
};

interface Props {
  value: ProjectGoal | '';
  onChange: (v: ProjectGoal) => void;
  error?: string;
}

export default function Step1Goal({ value, onChange, error }: Props) {
  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-900">What are you looking to achieve?</h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Choose the primary objective that aligns closest with your project vision.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {PROJECT_GOALS.map((goal) => {
          const meta = GOAL_META[goal];
          const Icon = meta.icon;
          const isSelected = value === goal;

          return (
            <button
              key={goal}
              type="button"
              onClick={() => onChange(goal)}
              className={`group relative text-left p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'border-cyan-500 bg-cyan-50/40 shadow-sm ring-1 ring-cyan-500'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-slate-900 text-cyan-400'
                        : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200/80'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-cyan-100/80 text-cyan-800'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {meta.badge}
                  </span>
                </div>

                <div className="font-bold text-sm text-slate-900 mb-1 leading-snug">
                  {goal}
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  {meta.desc}
                </p>
              </div>

              {/* Selection Indicator */}
              <div className="mt-3 pt-2.5 border-t border-slate-100/80 flex items-center justify-between text-[11px] font-semibold">
                <span className={isSelected ? 'text-cyan-700' : 'text-slate-400'}>
                  {isSelected ? 'Selected' : 'Select this goal'}
                </span>
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                    isSelected
                      ? 'border-cyan-500 bg-cyan-500 text-white'
                      : 'border-slate-300'
                  }`}
                >
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {error && (
        <p className="text-xs font-semibold text-rose-600 bg-rose-50 px-3 py-2 rounded-lg border border-rose-200 mt-2">
          {error}
        </p>
      )}
    </div>
  );
}
