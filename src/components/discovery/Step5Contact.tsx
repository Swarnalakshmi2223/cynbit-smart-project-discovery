// src/components/discovery/Step5Contact.tsx
import { DiscoveryFormData, PreferredContactMethod } from '@/types';
import { PREFERRED_CONTACT_METHODS } from '@/constants';

interface Props {
  data: DiscoveryFormData;
  onChange: <K extends keyof DiscoveryFormData>(k: K, v: DiscoveryFormData[K]) => void;
  errors: Record<string, string>;
}

function Label({ htmlFor, required, children }: { htmlFor: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-semibold text-[#1a1a2e] mb-1.5">
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );
}

export default function Step5Contact({ data, onChange, errors }: Props) {
  const inputClass = (err?: string) =>
    `w-full border ${err ? 'border-red-400' : 'border-gray-300'} rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent transition`;

  return (
    <div className="space-y-5">
      {/* Full name */}
      <div>
        <Label htmlFor="fullName" required>Full Name</Label>
        <input
          id="fullName"
          type="text"
          autoComplete="name"
          value={data.fullName}
          onChange={e => onChange('fullName', e.target.value)}
          placeholder="Your full name"
          className={inputClass(errors.fullName)}
        />
        {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Email */}
        <div>
          <Label htmlFor="email" required>Business Email</Label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={data.email}
            onChange={e => onChange('email', e.target.value)}
            placeholder="you@company.com"
            className={inputClass(errors.email)}
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <Label htmlFor="phone" required>Phone Number</Label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            value={data.phone}
            onChange={e => onChange('phone', e.target.value)}
            placeholder="+91 98765 43210"
            className={inputClass(errors.phone)}
          />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
        </div>
      </div>

      {/* Preferred contact */}
      <div>
        <Label htmlFor="preferredContactMethod" required>Preferred Contact Method</Label>
        <div className="flex gap-3">
          {PREFERRED_CONTACT_METHODS.map(method => (
            <button
              key={method}
              type="button"
              onClick={() => onChange('preferredContactMethod', method as PreferredContactMethod)}
              className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                data.preferredContactMethod === method
                  ? 'border-[#0ea5e9] bg-[#f0f9ff] text-[#0ea5e9]'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {method}
            </button>
          ))}
        </div>
        {errors.preferredContactMethod && <p className="mt-1 text-xs text-red-600">{errors.preferredContactMethod}</p>}
      </div>

      {/* Additional message */}
      <div>
        <Label htmlFor="additionalMessage">Additional Message <span className="text-gray-400 font-normal">(optional)</span></Label>
        <textarea
          id="additionalMessage"
          rows={3}
          value={data.additionalMessage}
          onChange={e => onChange('additionalMessage', e.target.value)}
          placeholder="Any other information you'd like us to know..."
          className={`w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent transition resize-none`}
        />
      </div>

      {/* Privacy consent */}
      <div className="bg-gray-50 rounded-xl p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.privacyConsent}
            onChange={e => onChange('privacyConsent', e.target.checked)}
            className="mt-0.5 h-4 w-4 text-[#0ea5e9] border-gray-300 rounded focus:ring-[#0ea5e9]"
          />
          <span className="text-sm text-gray-600 leading-relaxed">
            I agree to the{' '}
            <a href="https://www.cynbit.in" target="_blank" rel="noopener noreferrer" className="text-[#0ea5e9] underline">
              privacy policy
            </a>{' '}
            and consent to Cynbit Technologies contacting me regarding my project enquiry.
            My information will be handled securely and not shared with third parties.
            <span className="text-red-500"> *</span>
          </span>
        </label>
        {errors.privacyConsent && <p className="mt-2 text-xs text-red-600">{errors.privacyConsent}</p>}
      </div>
    </div>
  );
}

