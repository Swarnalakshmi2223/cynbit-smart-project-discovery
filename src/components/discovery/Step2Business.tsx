// src/components/discovery/Step2Business.tsx
import { DiscoveryFormData, Industry, CompanySize } from '@/types';
import { INDUSTRIES, COMPANY_SIZES } from '@/constants';

interface Props {
  data: DiscoveryFormData;
  onChange: <K extends keyof DiscoveryFormData>(k: K, v: DiscoveryFormData[K]) => void;
  errors: Record<string, string>;
}

function FieldError({ msg }: { msg?: string }) {
  return msg ? <p className="mt-1 text-xs text-red-600">{msg}</p> : null;
}

function Label({ htmlFor, required, children }: { htmlFor: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-semibold text-[#1a1a2e] mb-1.5">
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );
}

const inputClass = (err?: string) =>
  `w-full border ${err ? 'border-red-400' : 'border-gray-300'} rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent transition`;

export default function Step2Business({ data, onChange, errors }: Props) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Industry */}
        <div>
          <Label htmlFor="industry" required>Industry</Label>
          <select
            id="industry"
            value={data.industry}
            onChange={e => onChange('industry', e.target.value as Industry)}
            className={inputClass(errors.industry)}
          >
            <option value="">Select industry...</option>
            {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
          <FieldError msg={errors.industry} />
        </div>

        {/* Company size */}
        <div>
          <Label htmlFor="companySize" required>Company Size</Label>
          <select
            id="companySize"
            value={data.companySize}
            onChange={e => onChange('companySize', e.target.value as CompanySize)}
            className={inputClass(errors.companySize)}
          >
            <option value="">Select size...</option>
            {COMPANY_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <FieldError msg={errors.companySize} />
        </div>
      </div>

      {/* Company name */}
      <div>
        <Label htmlFor="companyName" required>Company Name</Label>
        <input
          id="companyName"
          type="text"
          value={data.companyName}
          onChange={e => onChange('companyName', e.target.value)}
          placeholder="Your company or organization name"
          className={inputClass(errors.companyName)}
        />
        <FieldError msg={errors.companyName} />
      </div>

      {/* Website */}
      <div>
        <Label htmlFor="website">Existing Website <span className="text-gray-400 font-normal">(optional)</span></Label>
        <input
          id="website"
          type="url"
          value={data.website}
          onChange={e => onChange('website', e.target.value)}
          placeholder="https://www.yourwebsite.com"
          className={inputClass(errors.website)}
        />
        <FieldError msg={errors.website} />
      </div>

      {/* Current systems */}
      <div>
        <Label htmlFor="currentSystems">Current Technology or Systems <span className="text-gray-400 font-normal">(optional)</span></Label>
        <input
          id="currentSystems"
          type="text"
          value={data.currentSystems}
          onChange={e => onChange('currentSystems', e.target.value)}
          placeholder="e.g., SAP, Salesforce, WordPress, custom-built system..."
          className={inputClass(errors.currentSystems)}
        />
        <p className="mt-1 text-xs text-gray-400">Mention any existing software or systems you currently use.</p>
      </div>
    </div>
  );
}

