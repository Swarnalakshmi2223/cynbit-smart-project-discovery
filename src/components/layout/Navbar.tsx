'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Menu, X, ArrowRight, Layers, ShieldCheck, Compass } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Discovery', href: '/discovery' },
    { label: 'Track Enquiry', href: '/track' },
    { label: 'Services', href: 'https://www.cynbit.in/#services', external: true },
    { label: 'Products', href: 'https://www.cynbit.in/#products', external: true },
    { label: 'About Cynbit', href: 'https://www.cynbit.in/about', external: true },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 via-slate-800 to-cyan-900 flex items-center justify-center shadow-md shadow-cyan-950/20 group-hover:shadow-cyan-500/20 transition-all duration-300 border border-slate-700/50">
              <Sparkles className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-slate-900">Cynbit</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200/80">
                  Discovery
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium hidden sm:block">Intelligent Project Studio</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/70 backdrop-blur-sm">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-white/70 transition-all"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-white text-slate-950 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/70'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/admin/login"
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100/80 transition-colors"
            >
              Admin Portal
            </Link>
            <Link
              href="/discovery"
              className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-md hover:shadow-cyan-500/20 transition-all duration-200"
            >
              <span>Start Project</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/discovery"
              className="text-xs font-bold px-3 py-1.5 rounded-full bg-slate-900 text-white"
            >
              Start
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden mt-3 p-4 bg-white/95 backdrop-blur-xl rounded-2xl border border-slate-200 shadow-xl space-y-2 animate-enter">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <span>{item.label}</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </a>
            ))}
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <Link
                href="/admin/login"
                onClick={() => setMenuOpen(false)}
                className="text-center py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 rounded-xl"
              >
                Admin Portal Login
              </Link>
              <Link
                href="/discovery"
                onClick={() => setMenuOpen(false)}
                className="w-full text-center py-3 bg-gradient-to-r from-slate-900 to-cyan-950 text-white text-xs font-bold rounded-xl shadow-md"
              >
                Start Intelligent Discovery →
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
