// src/components/discovery/Step4Budget.tsx
import { DiscoveryFormData, BudgetRange, ExpectedTimeline } from '@/types';
import { BUDGET_RANGES, EXPECTED_TIMELINES } from '@/constants';

interface Props {
  data: DiscoveryFormData;
  onChange: <K extends keyof DiscoveryFormData>(k: K, v: DiscoveryFormData[K]) => void;
  errors: Record<string, string>;
}

function OptionButton({
  selected, onClick, children,
}: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
        selected
          ? 'border-[#0ea5e9] bg-[#f0f9ff] text-[#0ea5e9]'
          : 'border-gray-200 text-gray-700 hover:border-gray-300'
      }`}
    >
      {children}
    </button>
  );
}

export default function Step4Budget({ data, onChange, errors }: Props) {
  return (
    <div className="space-y-8">
      {/* Budget */}
      <div>
        <label className="block text-sm font-semibold text-[#1a1a2e] mb-3">
          Estimated Budget <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {BUDGET_RANGES.map(range => (
            <OptionButton
              key={range}
              selected={data.budgetRange === range}
              onClick={() => onChange('budgetRange', range as BudgetRange)}
            >
              {range}
            </OptionButton>
          ))}
        </div>
        {errors.budgetRange && <p className="mt-2 text-xs text-red-600">{errors.budgetRange}</p>}
      </div>

      {/* Timeline */}
      <div>
        <label className="block text-sm font-semibold text-[#1a1a2e] mb-3">
          Expected Timeline <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {EXPECTED_TIMELINES.map(timeline => (
            <OptionButton
              key={timeline}
              selected={data.expectedTimeline === timeline}
              onClick={() => onChange('expectedTimeline', timeline as ExpectedTimeline)}
            >
              {timeline}
            </OptionButton>
          ))}
        </div>
        {errors.expectedTimeline && <p className="mt-2 text-xs text-red-600">{errors.expectedTimeline}</p>}
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
        💡 After this step, we&apos;ll show you a personalized service recommendation based on your selections.
      </div>
    </div>
  );
}

