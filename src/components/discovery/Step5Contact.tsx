'use client';

import { DiscoveryFormData, PreferredContactMethod } from '@/types';
import { PREFERRED_CONTACT_METHODS } from '@/constants';
import { User, Mail, Phone, MessageSquare, ShieldCheck, AlertCircle } from 'lucide-react';

interface Props {
  data: DiscoveryFormData;
  onChange: <K extends keyof DiscoveryFormData>(k: K, v: DiscoveryFormData[K]) => void;
  errors: Record<string, string>;
}

export default function Step5Contact({ data, onChange, errors }: Props) {
  return (
    <div className="space-y-5">
      <div className="mb-2">
        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
          Where should we deliver your project dossier?
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
          We will issue a permanent tracking reference code (<code className="text-cyan-400 font-mono text-xs">CYN-2026-XXXXXXX</code>) and assign an engineering lead to your account.
        </p>
      </div>

      {/* Full Name */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-cyan-400" />
          <span>Full Name</span>
          <span className="text-cyan-400">*</span>
        </label>
        <input
          type="text"
          value={data.fullName}
          onChange={(e) => onChange('fullName', e.target.value)}
          placeholder="e.g. Swarna Lakshmi"
          className={`w-full rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm bg-slate-950 text-white placeholder:text-slate-600 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 font-medium ${
            errors.fullName ? 'border-rose-500 bg-rose-950/20' : 'border-slate-800'
          }`}
        />
        {errors.fullName && (
          <p className="mt-1 text-xs text-rose-400 flex items-center gap-1 font-medium">
            <AlertCircle className="w-3 h-3" /> {errors.fullName}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Email */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>Corporate / Work Email</span>
            <span className="text-cyan-400">*</span>
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="you@company.com"
            className={`w-full rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm bg-slate-950 text-white placeholder:text-slate-600 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 font-medium ${
              errors.email ? 'border-rose-500 bg-rose-950/20' : 'border-slate-800'
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-rose-400 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3 h-3" /> {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-cyan-400" />
            <span>Direct Phone / Mobile</span>
            <span className="text-cyan-400">*</span>
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            placeholder="+91 98765 43210"
            className={`w-full rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm bg-slate-950 text-white placeholder:text-slate-600 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 font-medium font-mono ${
              errors.phone ? 'border-rose-500 bg-rose-950/20' : 'border-slate-800'
            }`}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-rose-400 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3 h-3" /> {errors.phone}
            </p>
          )}
        </div>
      </div>

      {/* Preferred Contact Method */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 block flex items-center gap-1.5">
          <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
          <span>Preferred Communication Channel</span>
          <span className="text-cyan-400">*</span>
        </label>
        <div className="grid grid-cols-3 gap-2.5">
          {PREFERRED_CONTACT_METHODS.map((method) => {
            const isSelected = data.preferredContactMethod === method;
            return (
              <button
                key={method}
                type="button"
                onClick={() => onChange('preferredContactMethod', method as PreferredContactMethod)}
                className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold border transition-all text-center ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-400 text-slate-950 font-black shadow-lg shadow-cyan-400/20 ring-1 ring-cyan-300'
                    : 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700 hover:bg-slate-900/80 hover:text-white'
                }`}
              >
                {method}
              </button>
            );
          })}
        </div>
        {errors.preferredContactMethod && (
          <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1 font-medium">
            <AlertCircle className="w-3 h-3" /> {errors.preferredContactMethod}
          </p>
        )}
      </div>

      {/* Additional Message */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
          <span>Additional Comments / Scheduling Notes</span>
          <span className="text-[10px] text-slate-500 font-normal lowercase tracking-normal">optional</span>
        </label>
        <textarea
          rows={2}
          value={data.additionalMessage}
          onChange={(e) => onChange('additionalMessage', e.target.value)}
          placeholder="Any specific preferred call dates or mutual NDA requirements..."
          className="w-full rounded-xl border border-slate-800 p-3 text-xs sm:text-sm bg-slate-950 text-white placeholder:text-slate-600 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 resize-none font-medium"
        />
      </div>

      {/* Privacy Consent */}
      <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.privacyConsent}
            onChange={(e) => onChange('privacyConsent', e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-500/30"
          />
          <span className="text-xs text-slate-400 leading-relaxed font-normal">
            I agree to the{' '}
            <a href="https://www.cynbit.in" target="_blank" rel="noopener noreferrer" className="text-cyan-400 font-bold underline underline-offset-2 hover:text-cyan-300">
              privacy policy
            </a>{' '}
            and consent to Cynbit Technologies contacting me regarding this project enquiry. Client data is protected under non-disclosure governance and strictly never shared with third parties.
            <span className="text-cyan-400 font-bold"> *</span>
          </span>
        </label>
        {errors.privacyConsent && (
          <p className="mt-2 text-xs text-rose-400 flex items-center gap-1 font-medium">
            <AlertCircle className="w-3 h-3" /> {errors.privacyConsent}
          </p>
        )}
      </div>
    </div>
  );
}
