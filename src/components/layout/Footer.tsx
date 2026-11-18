import Link from 'next/link';
import { Sparkles, Mail, Globe, Shield, Terminal, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Dossier */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-slate-900 to-cyan-900 border border-slate-800 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="font-bold text-base text-white tracking-tight">Cynbit Technologies</span>
            </div>

            <p className="text-slate-400 max-w-sm leading-relaxed font-normal">
              Cynbit Smart Discovery is an intelligent project enquiry, deterministic qualification, 
              and lead triage platform built for modern engineering requirements.
            </p>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 max-w-md">
              <p className="text-[11px] text-slate-400 leading-relaxed">
                <strong className="text-slate-300">Assessment Note:</strong> Prototype engineered for the Cynbit Technologies Full Stack Developer Intern challenge. Demonstrates Next.js 15, React 19, MongoDB Atlas, and REST Route Handlers.
              </p>
            </div>
          </div>

          {/* Platform Navigation */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3 text-[11px]">
              Platform Links
            </h4>
            <ul className="space-y-2 font-medium">
              {[
                { label: 'Project Discovery Studio', href: '/discovery' },
                { label: 'Track Enquiry Status', href: '/track' },
                { label: 'Administrator Portal', href: '/admin/login' },
                { label: 'Admin Dashboard', href: '/admin/dashboard' },
                { label: 'Lead Pipeline Analytics', href: '/admin/analytics' },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-cyan-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Official Cynbit Links */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3 text-[11px]">
              Official Cynbit Hub
            </h4>
            <ul className="space-y-2.5 font-medium">
              {[
                { label: 'Official Website (www.cynbit.in)', href: 'https://www.cynbit.in' },
                { label: 'Cynbit Services', href: 'https://www.cynbit.in/#services' },
                { label: 'Cynbit Products & BitElevate', href: 'https://www.cynbit.in/#products' },
                { label: 'About Cynbit Team', href: 'https://www.cynbit.in/about' },
                { label: 'Official Contact', href: 'https://www.cynbit.in/contact' },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
                  >
                    <span>{l.label}</span>
                    <ArrowUpRight className="w-3 h-3 text-slate-500" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Cynbit Technologies. Assessment Prototype.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Next.js 15 Turbopack</span>
            </span>
            <span>•</span>
            <span>MongoDB Atlas</span>
            <span>•</span>
            <span>Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
