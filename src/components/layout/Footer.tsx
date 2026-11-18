// src/components/layout/Footer.tsx
import Link from 'next/link';
import { Zap, Mail, Phone, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1a1a2e] text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#0ea5e9] rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg text-white">Cynbit Technologies</span>
            </div>
            <p className="text-sm leading-relaxed mb-4 max-w-sm">
              Cynbit Smart Discovery is an independent prototype demonstrating an intelligent
              project enquiry and lead qualification system for Cynbit Technologies.
            </p>
            <p className="text-xs text-gray-500">
              This is a Full Stack Developer Intern assessment prototype, not an official
              Cynbit production system.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Start Your Project', href: '/discovery' },
                { label: 'Track Enquiry', href: '/track' },
                { label: 'Admin Dashboard', href: '/admin/login' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
              {[
                { label: 'Official Website', href: 'https://www.cynbit.in' },
                { label: 'Services', href: 'https://www.cynbit.in/#services' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contact Cynbit</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <Globe className="w-4 h-4 text-[#0ea5e9] flex-shrink-0" />
                <a href="https://www.cynbit.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  www.cynbit.in
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-[#0ea5e9] flex-shrink-0" />
                <span>info@cynbit.in</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-[#0ea5e9] flex-shrink-0" />
                <span>Contact via website</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Cynbit Technologies. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Built with Next.js 15 · MongoDB Atlas · Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}

