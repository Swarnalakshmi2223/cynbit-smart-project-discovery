// src/components/discovery/Step3Requirements.tsx
import { DiscoveryFormData } from '@/types';

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

export default function Step3Requirements({ data, onChange, errors }: Props) {
  const inputClass = (err?: string) =>
    `w-full border ${err ? 'border-red-400' : 'border-gray-300'} rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent transition resize-none`;

  return (
    <div className="space-y-5">
      {/* Project description */}
      <div>
        <Label htmlFor="projectDescription" required>Project Description</Label>
        <textarea
          id="projectDescription"
          rows={4}
          value={data.projectDescription}
          onChange={e => onChange('projectDescription', e.target.value)}
          placeholder="Describe your project in detail. What problem are you solving? What do you want to build? Who are the end users?"
          className={inputClass(errors.projectDescription)}
        />
        <div className="flex justify-between mt-1">
          {errors.projectDescription
            ? <p className="text-xs text-red-600">{errors.projectDescription}</p>
            : <span className="text-xs text-gray-400">Minimum 50 characters</span>}
          <span className="text-xs text-gray-400">{data.projectDescription.length}/2000</span>
        </div>
      </div>

      {/* Required features */}
      <div>
        <Label htmlFor="requiredFeatures">Required Features <span className="text-gray-400 font-normal">(optional)</span></Label>
        <textarea
          id="requiredFeatures"
          rows={3}
          value={data.requiredFeatures}
          onChange={e => onChange('requiredFeatures', e.target.value)}
          placeholder="List the key features you need (e.g., user authentication, payment gateway, real-time notifications, dashboard...)"
          className={inputClass()}
        />
      </div>

      {/* Current challenges */}
      <div>
        <Label htmlFor="currentChallenges">Current Challenges <span className="text-gray-400 font-normal">(optional)</span></Label>
        <textarea
          id="currentChallenges"
          rows={2}
          value={data.currentChallenges}
          onChange={e => onChange('currentChallenges', e.target.value)}
          placeholder="What problems or limitations are you currently facing?"
          className={inputClass()}
        />
      </div>

      {/* Expected outcome */}
      <div>
        <Label htmlFor="expectedOutcome">Expected Outcome <span className="text-gray-400 font-normal">(optional)</span></Label>
        <textarea
          id="expectedOutcome"
          rows={2}
          value={data.expectedOutcome}
          onChange={e => onChange('expectedOutcome', e.target.value)}
          placeholder="What does success look like for this project?"
          className={inputClass()}
        />
      </div>

      {/* Integration requirements */}
      <div>
        <Label htmlFor="integrationRequirements">Integration Requirements <span className="text-gray-400 font-normal">(optional)</span></Label>
        <input
          id="integrationRequirements"
          type="text"
          value={data.integrationRequirements}
          onChange={e => onChange('integrationRequirements', e.target.value)}
          placeholder="e.g., CRM integration, payment gateway, third-party APIs..."
          className={`w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent transition`}
        />
      </div>
    </div>
  );
}

