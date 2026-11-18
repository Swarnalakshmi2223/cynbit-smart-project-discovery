'use client';
// src/app/track/page.tsx — Public enquiry tracking

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Search, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const STATUS_INFO: Record<string, { icon: React.ReactNode; color: string; desc: string }> = {
  New: { icon: <Clock className="w-5 h-5 text-blue-500" />, color: 'text-blue-700 bg-blue-50', desc: 'Your enquiry has been received and is awaiting review.' },
  'Under Review': { icon: <Clock className="w-5 h-5 text-yellow-500" />, color: 'text-yellow-700 bg-yellow-50', desc: 'Our team is currently reviewing your project requirements.' },
  Contacted: { icon: <CheckCircle className="w-5 h-5 text-purple-500" />, color: 'text-purple-700 bg-purple-50', desc: 'A Cynbit representative has reached out to you.' },
  'In Progress': { icon: <CheckCircle className="w-5 h-5 text-orange-500" />, color: 'text-orange-700 bg-orange-50', desc: 'Your project is actively being worked on.' },
  Completed: { icon: <CheckCircle className="w-5 h-5 text-green-500" />, color: 'text-green-700 bg-green-50', desc: 'Your project engagement has been completed.' },
  Rejected: { icon: <AlertCircle className="w-5 h-5 text-red-500" />, color: 'text-red-700 bg-red-50', desc: 'Your enquiry could not be progressed. Please contact us directly.' },
};

function TrackContent() {
  const router = useRouter();
  const params = useSearchParams();
  const [refId, setRefId] = useState(params.get('ref') ?? '');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | Record<string, string>>(null);
  const [error, setError] = useState('');

  async function handleTrack(e: React.FormEvent) {
    e.preventDefault();
    if (!refId.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await fetch(`/api/leads/track/${encodeURIComponent(refId.trim().toUpperCase())}`);
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? 'Enquiry not found.');
      } else {
        setResult(json.data);
        router.replace(`/track?ref=${encodeURIComponent(refId.trim().toUpperCase())}`, { scroll: false });
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const statusConfig = result ? STATUS_INFO[result.status] : null;

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-[#1a1a2e] mb-2">Track Your Enquiry</h1>
        <p className="text-gray-500">Enter your reference ID to check the status of your project enquiry.</p>
      </div>

      <form onSubmit={handleTrack} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <label className="block text-sm font-semibold text-[#1a1a2e] mb-2">Reference ID</label>
        <div className="flex gap-3">
          <input
            type="text"
            value={refId}
            onChange={e => setRefId(e.target.value.toUpperCase())}
            placeholder="CYN-2026-XXXXXXX"
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm font-mono text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent"
          />
          <button
            type="submit"
            disabled={loading || !refId.trim()}
            className="px-5 py-3 bg-[#1a1a2e] text-white rounded-xl font-semibold text-sm hover:bg-[#16213e] transition-colors disabled:opacity-60 flex items-center gap-2"
          >
            {loading ? <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <Search className="w-4 h-4" />}
            Track
          </button>
        </div>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </form>

      {result && statusConfig && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-fadeIn">
          <div className="flex items-center gap-3 mb-5">
            {statusConfig.icon}
            <div>
              <p className="font-bold text-[#1a1a2e]">Enquiry Found</p>
              <p className="text-xs text-gray-500 font-mono">{result.referenceId}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm py-2 border-b border-gray-100">
              <span className="text-gray-500">Project Goal</span>
              <span className="font-medium text-right max-w-xs">{result.projectGoal}</span>
            </div>
            <div className="flex justify-between text-sm py-2 border-b border-gray-100">
              <span className="text-gray-500">Recommended Service</span>
              <span className="font-medium text-[#0ea5e9] text-right max-w-xs">{result.recommendedService}</span>
            </div>
            <div className="flex justify-between text-sm py-2 border-b border-gray-100">
              <span className="text-gray-500">Status</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${statusConfig.color}`}>{result.status}</span>
            </div>
            <div className="flex justify-between text-sm py-2">
              <span className="text-gray-500">Submitted</span>
              <span className="font-medium">{new Date(result.submittedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
            </div>
          </div>
          <div className="mt-4 p-3 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-600">{statusConfig.desc}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TrackPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 pt-24 pb-16 px-4">
        <Suspense fallback={<div className="text-center pt-20">Loading...</div>}>
          <TrackContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

