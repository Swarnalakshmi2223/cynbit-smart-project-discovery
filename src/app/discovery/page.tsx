import Navbar from '@/components/layout/Navbar';
import DiscoveryForm from '@/components/discovery/DiscoveryForm';
import Footer from '@/components/layout/Footer';
import { Sparkles, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';

export const metadata = {
  title: 'Intelligent Project Discovery Studio – Cynbit Technologies',
  description:
    'Complete our intelligent project discovery journey and receive an immediate architectural diagnosis and Cynbit squad match.',
};

export default function DiscoveryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 relative selection:bg-cyan-500/20 selection:text-cyan-300 overflow-x-hidden">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 relative">
        {/* Ambient atmospheric glows */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-60 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 dark-grid-pattern opacity-30 pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center mb-8 relative z-10">
          {/* Header pill badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold mb-3.5 shadow-lg shadow-cyan-950/40">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Engineering Studio</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
            Intelligent Project Discovery
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
            Answer a few structured technical questions. Our deterministic engine will analyze your scope,
            calculate qualification metrics, and match you with the optimal Cynbit squad.
          </p>

          {/* Quick trust metrics */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Takes ~2 minutes</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Instant Squad Diagnosis</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>100% Confidential</span>
            </span>
          </div>
        </div>

        {/* Discovery Multi-step Form */}
        <div className="relative z-10">
          <DiscoveryForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
