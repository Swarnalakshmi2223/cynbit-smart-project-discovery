// src/components/layout/Navbar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Zap } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1a1a2e] rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-[#0ea5e9]" />
            </div>
            <span className="font-bold text-lg text-[#1a1a2e]">Cynbit</span>
            <span className="text-xs text-[#0ea5e9] font-semibold hidden sm:block border border-[#0ea5e9] px-1.5 py-0.5 rounded">
              Smart Discovery
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: 'Home', href: '/' },
              { label: 'Services', href: 'https://www.cynbit.in/#services', external: true },
              { label: 'Products', href: 'https://www.cynbit.in/#products', external: true },
              { label: 'About', href: 'https://www.cynbit.in/about', external: true },
              { label: 'Contact', href: 'https://www.cynbit.in/contact', external: true },
            ].map(({ label, href, external }) => (
              <a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="text-sm font-medium text-gray-600 hover:text-[#1a1a2e] transition-colors"
              >
                {label}
              </a>
            ))}
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/discovery"
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#1a1a2e] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#16213e] transition-colors"
            >
              Start Your Project
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 space-y-2">
            {['Home', 'Services', 'Products', 'About', 'Contact'].map(item => (
              <a
                key={item}
                href={item === 'Home' ? '/' : `https://www.cynbit.in/${item.toLowerCase()}`}
                className="block px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <div className="pt-2 px-4">
              <Link
                href="/discovery"
                className="block w-full text-center bg-[#1a1a2e] text-white text-sm font-semibold px-4 py-2.5 rounded-lg"
                onClick={() => setMenuOpen(false)}
              >
                Start Your Project
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

