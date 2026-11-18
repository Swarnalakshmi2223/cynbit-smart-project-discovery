'use client';

import { DiscoveryFormData, Industry, CompanySize } from '@/types';
import { INDUSTRIES, COMPANY_SIZES } from '@/constants';
import { Building, Users, Globe, Cpu, AlertCircle } from 'lucide-react';

interface Props {
  data: DiscoveryFormData;
  onChange: <K extends keyof DiscoveryFormData>(k: K, v: DiscoveryFormData[K]) => void;
  errors: Record<string, string>;
}

export default function Step2Business({ data, onChange, errors }: Props) {
  return (
    <div className="space-y-5">
      <div className="mb-2">
        <h3 className="text-lg font-bold text-slate-900">Tell us about your organization</h3>
        <p className="text-xs text-slate-500 mt-0.5">
          This context helps our engineering architects size the recommended squad and tech stack.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Industry */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-slate-500" />
            <span>Target Industry</span>
            <span className="text-cyan-600">*</span>
          </label>
          <select
            value={data.industry}
            onChange={(e) => onChange('industry', e.target.value as Industry)}
            className={`w-full rounded-xl border px-3.5 py-2.5 text-sm bg-white text-slate-900 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 ${
              errors.industry ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'
            }`}
          >
            <option value="">Select industry category...</option>
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
          {errors.industry && (
            <p className="mt-1 text-xs text-rose-600 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3 h-3" /> {errors.industry}
            </p>
          )}
        </div>

        {/* Company Size */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-slate-500" />
            <span>Company Size</span>
            <span className="text-cyan-600">*</span>
          </label>
          <select
            value={data.companySize}
            onChange={(e) => onChange('companySize', e.target.value as CompanySize)}
            className={`w-full rounded-xl border px-3.5 py-2.5 text-sm bg-white text-slate-900 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 ${
              errors.companySize ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'
            }`}
          >
            <option value="">Select organizational scale...</option>
            {COMPANY_SIZES.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          {errors.companySize && (
            <p className="mt-1 text-xs text-rose-600 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3 h-3" /> {errors.companySize}
            </p>
          )}
        </div>
      </div>

      {/* Company Name */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
          Company or Brand Name <span className="text-cyan-600">*</span>
        </label>
        <input
          type="text"
          value={data.companyName}
          onChange={(e) => onChange('companyName', e.target.value)}
          placeholder="e.g. Acme Technologies Inc."
          className={`w-full rounded-xl border px-3.5 py-2.5 text-sm bg-white text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 ${
            errors.companyName ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'
          }`}
        />
        {errors.companyName && (
          <p className="mt-1 text-xs text-rose-600 flex items-center gap-1 font-medium">
            <AlertCircle className="w-3 h-3" /> {errors.companyName}
          </p>
        )}
      </div>

      {/* Website */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            Existing Website
          </span>
          <span className="text-[10px] text-slate-400 font-normal lowercase tracking-normal">optional</span>
        </label>
        <input
          type="url"
          value={data.website}
          onChange={(e) => onChange('website', e.target.value)}
          placeholder="https://yourcompany.com"
          className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm bg-white text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
        />
      </div>

      {/* Current Systems */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-slate-500" />
            Current Systems & Architecture
          </span>
          <span className="text-[10px] text-slate-400 font-normal lowercase tracking-normal">optional</span>
        </label>
        <input
          type="text"
          value={data.currentSystems}
          onChange={(e) => onChange('currentSystems', e.target.value)}
          placeholder="e.g. AWS, Salesforce CRM, PostgreSQL, legacy WordPress..."
          className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm bg-white text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
        />
        <p className="mt-1 text-[11px] text-slate-400 font-normal">
          Helps identify legacy migration requirements or third-party API hookups.
        </p>
      </div>
    </div>
  );
}
