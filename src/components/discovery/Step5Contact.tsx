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
        <h3 className="text-lg font-bold text-slate-900">Where should we deliver your project dossier?</h3>
        <p className="text-xs text-slate-500 mt-0.5">
          We will send your unique reference code and assigned engineering team contact here.
        </p>
      </div>

      {/* Full Name */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-slate-500" />
          <span>Full Name</span>
          <span className="text-cyan-600">*</span>
        </label>
        <input
          type="text"
          value={data.fullName}
          onChange={(e) => onChange('fullName', e.target.value)}
          placeholder="e.g. Swarna Lakshmi"
          className={`w-full rounded-xl border px-3.5 py-2.5 text-sm bg-white text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 ${
            errors.fullName ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'
          }`}
        />
        {errors.fullName && (
          <p className="mt-1 text-xs text-rose-600 flex items-center gap-1 font-medium">
            <AlertCircle className="w-3 h-3" /> {errors.fullName}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Email */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-slate-500" />
            <span>Work Email</span>
            <span className="text-cyan-600">*</span>
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="you@company.com"
            className={`w-full rounded-xl border px-3.5 py-2.5 text-sm bg-white text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 ${
              errors.email ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-rose-600 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3 h-3" /> {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-slate-500" />
            <span>Direct Phone / Mobile</span>
            <span className="text-cyan-600">*</span>
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            placeholder="+91 98765 43210"
            className={`w-full rounded-xl border px-3.5 py-2.5 text-sm bg-white text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 ${
              errors.phone ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'
            }`}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-rose-600 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3 h-3" /> {errors.phone}
            </p>
          )}
        </div>
      </div>

      {/* Preferred Contact Method */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 block flex items-center gap-1.5">
          <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
          <span>Preferred Communication Channel</span>
          <span className="text-cyan-600">*</span>
        </label>
        <div className="grid grid-cols-3 gap-2.5">
          {PREFERRED_CONTACT_METHODS.map((method) => {
            const isSelected = data.preferredContactMethod === method;
            return (
              <button
                key={method}
                type="button"
                onClick={() => onChange('preferredContactMethod', method as PreferredContactMethod)}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                  isSelected
                    ? 'border-cyan-500 bg-cyan-50/60 text-cyan-900 ring-1 ring-cyan-500 font-bold'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                {method}
              </button>
            );
          })}
        </div>
        {errors.preferredContactMethod && (
          <p className="mt-1 text-xs text-rose-600 flex items-center gap-1 font-medium">
            <AlertCircle className="w-3 h-3" /> {errors.preferredContactMethod}
          </p>
        )}
      </div>

      {/* Additional Message */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center justify-between">
          <span>Additional Comments / Scheduling Notes</span>
          <span className="text-[10px] text-slate-400 font-normal lowercase tracking-normal">optional</span>
        </label>
        <textarea
          rows={2}
          value={data.additionalMessage}
          onChange={(e) => onChange('additionalMessage', e.target.value)}
          placeholder="Any specific dates for a discovery call or NDA requirements..."
          className="w-full rounded-xl border border-slate-200 p-3 text-sm bg-white text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 resize-none"
        />
      </div>

      {/* Privacy Consent */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.privacyConsent}
            onChange={(e) => onChange('privacyConsent', e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
          />
          <span className="text-xs text-slate-600 leading-relaxed font-normal">
            I agree to the{' '}
            <a href="https://www.cynbit.in" target="_blank" rel="noopener noreferrer" className="text-cyan-700 font-bold underline">
              privacy policy
            </a>{' '}
            and consent to Cynbit Technologies contacting me regarding this project enquiry. Your information is protected under strict confidentiality and never shared with external parties.
            <span className="text-cyan-600 font-bold"> *</span>
          </span>
        </label>
        {errors.privacyConsent && (
          <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
            <AlertCircle className="w-3 h-3" /> {errors.privacyConsent}
          </p>
        )}
      </div>
    </div>
  );
}
