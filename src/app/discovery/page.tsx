// src/app/discovery/page.tsx
import Navbar from '@/components/layout/Navbar';
import DiscoveryForm from '@/components/discovery/DiscoveryForm';

export const metadata = {
  title: 'Start Your Project – Cynbit Smart Discovery',
  description: 'Complete our intelligent project discovery form and receive a personalized service recommendation from Cynbit Technologies.',
};

export default function DiscoveryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#1a1a2e] text-[#0ea5e9] text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            5-Step Discovery Process
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1a1a2e] mb-3">
            Tell Us About Your Project
          </h1>
          <p className="text-gray-500 leading-relaxed">
            Answer a few simple questions and we&apos;ll match you with the right Cynbit service and
            connect you with our team.
          </p>
        </div>
        <DiscoveryForm />
      </main>
    </div>
  );
}

