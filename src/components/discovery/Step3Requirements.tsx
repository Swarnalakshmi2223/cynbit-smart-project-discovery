'use client';

import { DiscoveryFormData } from '@/types';
import { FileText, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Props {
  data: DiscoveryFormData;
  onChange: <K extends keyof DiscoveryFormData>(k: K, v: DiscoveryFormData[K]) => void;
  errors: Record<string, string>;
}

export default function Step3Requirements({ data, onChange, errors }: Props) {
  const charCount = data.projectDescription?.length || 0;
  const isSatisfied = charCount >= 50;

  return (
    <div className="space-y-5">
      <div className="mb-2">
        <h3 className="text-lg font-bold text-white tracking-tight">Technical Scope & Requirements</h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Describe the core problem statement, required functionalities, and target user personas.
        </p>
      </div>

      {/* Primary Project Description */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Project Scope & Vision</span>
            <span className="text-cyan-400">*</span>
          </label>

          <span
            className={`text-[11px] font-mono font-semibold flex items-center gap-1 ${
              isSatisfied ? 'text-emerald-400' : 'text-slate-500'
            }`}
          >
            {isSatisfied ? (
              <>
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>{charCount} / 2000 chars</span>
              </>
            ) : (
              <span>{charCount} / 50 min chars</span>
            )}
          </span>
        </div>

        <textarea
          rows={4}
          value={data.projectDescription}
          onChange={(e) => onChange('projectDescription', e.target.value)}
          placeholder="Describe your initiative in detail. What is the business challenge? What are the key features needed? What does success look like for your team?"
          className={`w-full rounded-xl border p-3.5 text-xs sm:text-sm bg-slate-950 text-white placeholder:text-slate-600 leading-relaxed transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 resize-none font-medium ${
            errors.projectDescription ? 'border-rose-500 bg-rose-950/20' : 'border-slate-800'
          }`}
        />

        {errors.projectDescription && (
          <p className="mt-1 text-xs text-rose-400 flex items-center gap-1 font-medium">
            <AlertCircle className="w-3 h-3" /> {errors.projectDescription}
          </p>
        )}
      </div>

      {/* Required Features */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
          <span>Key Specific Features</span>
          <span className="text-[10px] text-slate-500 font-mono font-normal">optional</span>
        </label>
        <input
          type="text"
          value={data.requiredFeatures}
          onChange={(e) => onChange('requiredFeatures', e.target.value)}
          placeholder="e.g. Multi-tenant auth, automated triage, Stripe billing, dashboard reports..."
          className="w-full rounded-xl border border-slate-800 px-3.5 py-2.5 text-xs sm:text-sm bg-slate-950 text-white placeholder:text-slate-600 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 font-medium"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Current Challenges */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
            <span>Primary Bottlenecks</span>
            <span className="text-[10px] text-slate-500 font-mono font-normal">optional</span>
          </label>
          <input
            type="text"
            value={data.currentChallenges}
            onChange={(e) => onChange('currentChallenges', e.target.value)}
            placeholder="e.g. High manual overhead, slow load times..."
            className="w-full rounded-xl border border-slate-800 px-3.5 py-2.5 text-xs sm:text-sm bg-slate-950 text-white placeholder:text-slate-600 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 font-medium"
          />
        </div>

        {/* Expected Outcome */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
            <span>Target Business Outcome</span>
            <span className="text-[10px] text-slate-500 font-mono font-normal">optional</span>
          </label>
          <input
            type="text"
            value={data.expectedOutcome}
            onChange={(e) => onChange('expectedOutcome', e.target.value)}
            placeholder="e.g. Launch MVP in 60 days, automate triage..."
            className="w-full rounded-xl border border-slate-800 px-3.5 py-2.5 text-xs sm:text-sm bg-slate-950 text-white placeholder:text-slate-600 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 font-medium"
          />
        </div>
      </div>
    </div>
  );
}
