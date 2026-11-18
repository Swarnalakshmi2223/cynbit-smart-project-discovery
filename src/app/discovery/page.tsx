import Navbar from '@/components/layout/Navbar';
import DiscoveryForm from '@/components/discovery/DiscoveryForm';
import Footer from '@/components/layout/Footer';
import { Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Project Discovery Studio – Cynbit Technologies',
  description:
    'Complete our intelligent project discovery journey and receive an immediate architectural diagnosis and Cynbit squad match.',
};

export default function DiscoveryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-cyan-500/20 selection:text-cyan-900">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-4 relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 hero-glow pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center mb-10 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100/70 border border-cyan-300/60 text-cyan-900 text-xs font-bold mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>Interactive Scoping Studio</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Intelligent Project Discovery
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
            Answer a few key questions about your initiative. Our deterministic system will match your scope
            with the optimal Cynbit technical discipline.
          </p>
        </div>

        <div className="relative z-10">
          <DiscoveryForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
