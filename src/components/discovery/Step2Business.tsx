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
        <h3 className="text-lg font-bold text-white tracking-tight">Organization Profile & Architecture</h3>
        <p className="text-xs text-slate-400 mt-0.5">
          This context helps our engineering architects size the recommended squad and tech stack.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Industry */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-cyan-400" />
            <span>Target Industry</span>
            <span className="text-cyan-400">*</span>
          </label>
          <select
            value={data.industry}
            onChange={(e) => onChange('industry', e.target.value as Industry)}
            className={`w-full rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm bg-slate-950 text-white transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 font-medium ${
              errors.industry ? 'border-rose-500 bg-rose-950/20' : 'border-slate-800'
            }`}
          >
            <option value="">Select industry category...</option>
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind} className="bg-slate-900 text-white">
                {ind}
              </option>
            ))}
          </select>
          {errors.industry && (
            <p className="mt-1 text-xs text-rose-400 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3 h-3" /> {errors.industry}
            </p>
          )}
        </div>

        {/* Company Size */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>Company Size</span>
            <span className="text-cyan-400">*</span>
          </label>
          <select
            value={data.companySize}
            onChange={(e) => onChange('companySize', e.target.value as CompanySize)}
            className={`w-full rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm bg-slate-950 text-white transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 font-medium ${
              errors.companySize ? 'border-rose-500 bg-rose-950/20' : 'border-slate-800'
            }`}
          >
            <option value="">Select organizational scale...</option>
            {COMPANY_SIZES.map((size) => (
              <option key={size} value={size} className="bg-slate-900 text-white">
                {size}
              </option>
            ))}
          </select>
          {errors.companySize && (
            <p className="mt-1 text-xs text-rose-400 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3 h-3" /> {errors.companySize}
            </p>
          )}
        </div>
      </div>

      {/* Company Name */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
          Company or Brand Name <span className="text-cyan-400">*</span>
        </label>
        <input
          type="text"
          value={data.companyName}
          onChange={(e) => onChange('companyName', e.target.value)}
          placeholder="e.g. Apex HealthTech Innovations"
          className={`w-full rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm bg-slate-950 text-white placeholder:text-slate-600 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 font-medium ${
            errors.companyName ? 'border-rose-500 bg-rose-950/20' : 'border-slate-800'
          }`}
        />
        {errors.companyName && (
          <p className="mt-1 text-xs text-rose-400 flex items-center gap-1 font-medium">
            <AlertCircle className="w-3 h-3" /> {errors.companyName}
          </p>
        )}
      </div>

      {/* Website */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            Existing Website
          </span>
          <span className="text-[10px] text-slate-500 font-mono font-normal">optional</span>
        </label>
        <input
          type="url"
          value={data.website}
          onChange={(e) => onChange('website', e.target.value)}
          placeholder="https://apexhealth.example.com"
          className="w-full rounded-xl border border-slate-800 px-3.5 py-2.5 text-xs sm:text-sm bg-slate-950 text-white placeholder:text-slate-600 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 font-medium"
        />
      </div>

      {/* Current Systems */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            Current Systems & Architecture
          </span>
          <span className="text-[10px] text-slate-500 font-mono font-normal">optional</span>
        </label>
        <input
          type="text"
          value={data.currentSystems}
          onChange={(e) => onChange('currentSystems', e.target.value)}
          placeholder="e.g. Salesforce CRM, PostgreSQL, legacy WordPress, AWS..."
          className="w-full rounded-xl border border-slate-800 px-3.5 py-2.5 text-xs sm:text-sm bg-slate-950 text-white placeholder:text-slate-600 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 font-medium"
        />
        <p className="mt-1 text-[11px] text-slate-500 font-normal">
          Identifies existing database models or third-party API hookups.
        </p>
      </div>
    </div>
  );
}
