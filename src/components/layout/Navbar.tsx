'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Menu, X, ArrowRight, ShieldCheck, Compass, ExternalLink } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Discovery Studio', href: '/discovery' },
    { label: 'Track Enquiry', href: '/track' },
    { label: 'Services', href: 'https://www.cynbit.in/#services', external: true },
    { label: 'Products', href: 'https://www.cynbit.in/#products', external: true },
    { label: 'About Cynbit', href: 'https://www.cynbit.in/about', external: true },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 pt-4">
      <div
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${
          scrolled
            ? 'bg-slate-950/85 backdrop-blur-xl border border-slate-800/90 shadow-2xl shadow-slate-950/50 py-3 px-5 sm:px-6'
            : 'bg-slate-950/60 backdrop-blur-md border border-white/10 py-3.5 px-5 sm:px-6'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25 group-hover:shadow-cyan-400/40 transition-all duration-300">
                <Sparkles className="w-5 h-5 text-white group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-cyan-400 rounded-full ring-2 ring-slate-950 animate-pulse" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  Cynbit
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  Smart Discovery
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium hidden sm:block">
                Intelligent Project Triage
              </span>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 px-2 py-1.5 rounded-full border border-slate-800/80">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/90 transition-all flex items-center gap-1 group"
                >
                  <span>{item.label}</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all relative ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/90'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/admin/login"
              className="text-xs font-semibold text-slate-400 hover:text-white px-3.5 py-2 rounded-xl hover:bg-slate-900/80 border border-transparent hover:border-slate-800 transition-all"
            >
              Admin Portal
            </Link>

            <Link
              href="/discovery"
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-400 hover:opacity-95 shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 group"
            >
              <span>Start Project</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-950 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/discovery"
              className="text-xs font-bold px-3 py-1.5 rounded-lg bg-cyan-400 text-slate-950"
            >
              Start
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-800 transition-colors"
              aria-label="Toggle navigation"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {menuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-slate-800/80 space-y-2 animate-enter">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
              >
                <span>{item.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              </a>
            ))}

            <div className="pt-2 border-t border-slate-900 flex flex-col gap-2">
              <Link
                href="/admin/login"
                onClick={() => setMenuOpen(false)}
                className="text-center py-2.5 text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900 rounded-xl"
              >
                Admin Portal Login
              </Link>
              <Link
                href="/discovery"
                onClick={() => setMenuOpen(false)}
                className="w-full text-center py-3 bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 text-xs font-extrabold rounded-xl shadow-lg"
              >
                Start Guided Discovery →
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
