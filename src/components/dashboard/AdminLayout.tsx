'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  Sparkles, LayoutDashboard, Users, BarChart3, LogOut, Menu, X,
  ChevronRight, Database, ExternalLink, Shield, Bell, CheckCircle2
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Executive Dashboard', href: '/admin/dashboard', icon: LayoutDashboard, badge: null },
  { label: 'Enquiry Leads Pipeline', href: '/admin/leads', icon: Users, badge: 'Live' },
  { label: 'Performance Analytics', href: '/admin/analytics', icon: BarChart3, badge: null },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [admin, setAdmin] = useState<{ name: string; email: string; role?: string } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((j) => {
        if (j.success) setAdmin(j.data);
        else router.push('/admin/login');
      })
      .catch(() => router.push('/admin/login'));
  }, [router]);

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  if (!admin) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/20">
          <Sparkles className="w-6 h-6 text-white animate-spin" />
        </div>
        <p className="text-xs font-mono text-slate-400">Authenticating administrator session...</p>
      </div>
    );
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-slate-950 text-slate-300 border-r border-slate-900 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-900 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-sky-500 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-500/20">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm text-white tracking-tight">Cynbit</span>
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                HQ
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium">Smart Discovery Studio</p>
          </div>
        </Link>
      </div>

      {/* Database Cluster Status Indicator */}
      <div className="px-5 py-3 border-b border-slate-900/80 bg-slate-900/30 flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-slate-400">Atlas Cluster:</span>
        </div>
        <span className="text-emerald-400 font-mono font-semibold">ONLINE</span>
      </div>

      {/* Navigation Group */}
      <div className="flex-1 py-5 px-3 space-y-1">
        <p className="px-3 pb-2 text-[10px] font-mono uppercase tracking-wider font-bold text-slate-500">
          Administration Modules
        </p>
        {NAV_ITEMS.map(({ label, href, icon: Icon, badge }) => {
          const isActive = pathname === href || (href !== '/admin/dashboard' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/15 to-blue-500/15 text-white border border-cyan-500/30 shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/70 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'
                  }`}
                />
                <span>{label}</span>
              </div>

              {badge && (
                <span className="text-[9px] font-mono uppercase font-bold px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Public Site Quick Jump */}
      <div className="px-3 py-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-400 hover:text-white hover:border-slate-700 transition-all"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            <span>Open Client Portal</span>
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        </Link>
      </div>

      {/* Admin Profile & Logout */}
      <div className="p-4 border-t border-slate-900 bg-slate-950">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
              {admin.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">{admin.name}</p>
              <p className="text-[10px] text-slate-500 truncate">{admin.email}</p>
            </div>
          </div>
          <span className="text-[9px] font-mono uppercase font-bold px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
            {admin.role || 'Admin'}
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-900/80 hover:bg-rose-950/40 text-slate-400 hover:text-rose-300 border border-slate-800 hover:border-rose-900/60 text-xs font-semibold transition-all"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out Session</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 fixed inset-y-0 z-30 shadow-2xl">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-72 bg-slate-950 flex flex-col shadow-2xl">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Main Content Viewport */}
      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        {/* Top Control Bar */}
        <header className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span>Cynbit Admin</span>
                <span>/</span>
                <span className="text-cyan-400 capitalize">
                  {pathname.split('/')[2] || 'Dashboard'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400">
              <Database className="w-3 h-3 text-cyan-400" />
              <span>MongoDB Atlas</span>
            </div>
          </div>
        </header>

        {/* Page Content Container */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
