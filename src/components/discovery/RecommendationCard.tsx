// src/components/discovery/RecommendationCard.tsx
import { RecommendationResult } from '@/types';
import { Sparkles, TrendingUp, ArrowRight } from 'lucide-react';

interface Props { recommendation: RecommendationResult; }

const PRIORITY_CONFIG = {
  High: { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', badge: 'bg-red-100 text-red-700' },
  Medium: { color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200', badge: 'bg-yellow-100 text-yellow-700' },
  Low: { color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', badge: 'bg-green-100 text-green-700' },
};

export default function RecommendationCard({ recommendation }: Props) {
  const { recommendedService, reason, priorityScore, priorityLevel, nextStep } = recommendation;
  const config = PRIORITY_CONFIG[priorityLevel];

  return (
    <div className="animate-fadeIn">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-[#f0f9ff] text-[#0ea5e9] px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <Sparkles className="w-4 h-4" />
          Service Recommendation
        </div>
        <h2 className="text-2xl font-bold text-[#1a1a2e]">Your Recommended Cynbit Service</h2>
        <p className="text-gray-500 text-sm mt-2">
          Based on your selections — this is a suggestion, not a commitment.
        </p>
      </div>

      {/* Main recommendation */}
      <div className="bg-[#1a1a2e] rounded-2xl p-6 mb-4 text-white">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Recommended Service</p>
            <h3 className="text-xl font-bold">{recommendedService}</h3>
          </div>
          <div className="text-right">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${config.badge}`}>
              {priorityLevel} Priority
            </div>
          </div>
        </div>

        {/* Priority score */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Priority Score
            </span>
            <span className="text-sm font-bold text-white">{priorityScore}/100</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0ea5e9] rounded-full transition-all duration-700"
              style={{ width: `${priorityScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* Reason */}
      <div className={`${config.bg} border ${config.border} rounded-xl p-4 mb-4`}>
        <p className="text-sm text-gray-700 leading-relaxed"><strong>Why this service?</strong><br />{reason}</p>
      </div>

      {/* Next step */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <ArrowRight className="w-4 h-4 text-[#0ea5e9] mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-700"><strong>Next Step:</strong><br />{nextStep}</p>
        </div>
      </div>

      <p className="text-center text-xs text-gray-400 mt-4">
        Continue to provide your contact details so our team can reach you.
      </p>
    </div>
  );
}

