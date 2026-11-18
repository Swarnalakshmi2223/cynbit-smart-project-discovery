'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/dashboard/AdminLayout';
import { AnalyticsData } from '@/types';
import {
  Users, AlertCircle, TrendingUp, Clock, CheckCircle2,
  ArrowRight, Sparkles, Filter, ChevronRight, BarChart2,
  ArrowUpRight, Layers
} from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  sublabel: string;
  highlight?: boolean;
}

function MetricCard({ label, value, icon: Icon, color, sublabel, highlight }: MetricCardProps) {
  return (
    <div
      className={`relative p-5 rounded-2xl border transition-all duration-300 card-hover overflow-hidden ${
        highlight
          ? 'bg-gradient-to-br from-slate-900 to-cyan-950/40 border-cyan-500/40 shadow-lg shadow-cyan-950/20'
          : 'bg-slate-900/60 border-slate-800/80'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-slate-400">{label}</span>
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${color} text-white shadow-sm`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="text-2xl sm:text-3xl font-black font-mono text-white mb-1 tracking-tight">
        {value}
      </div>

      <div className="text-[11px] font-medium text-slate-500 flex items-center justify-between">
        <span>{sublabel}</span>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/analytics')
      .then((r) => r.json())
      .then((j) => {
        if (j.success) setData(j.data);
        else setError(j.error);
      })
      .catch(() => setError('Failed to communicate with MongoDB analytics engine'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout>
      {/* Page Title & Status */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold mb-1.5">
            <Sparkles className="w-3 h-3" />
            <span>Triage Command Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Executive Lead Overview
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time pipeline monitoring and automated qualification triage.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/leads?status=New"
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
          >
            <span>Review New Queue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-28 rounded-2xl bg-slate-900/60 border border-slate-800 animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-300 text-xs">
          {error}
        </div>
      ) : data ? (
        <div className="space-y-8 animate-enter">
          {/* Top KPI Metrics Row */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <MetricCard
              label="Total Enquiries"
              value={data.summary.total}
              icon={Users}
              color="bg-slate-800"
              sublabel="Lifetime submissions"
              highlight
            />
            <MetricCard
              label="New Enquiries"
              value={data.summary.newLeads}
              icon={Clock}
              color="bg-blue-600"
              sublabel="Awaiting assignment"
            />
            <MetricCard
              label="High Priority"
              value={data.summary.highPriority}
              icon={AlertCircle}
              color="bg-rose-600"
              sublabel="Score ≥ 60 qualification"
            />
            <MetricCard
              label="In Progress"
              value={data.summary.inProgress}
              icon={TrendingUp}
              color="bg-amber-600"
              sublabel="Active discovery phase"
            />
            <MetricCard
              label="Completed"
              value={data.summary.completed}
              icon={CheckCircle2}
              color="bg-emerald-600"
              sublabel="Successfully engaged"
            />
          </div>

          {/* Middle Visualization Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Status Breakdown Panel */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight">
                    Lead Lifecycle Pipeline
                  </h3>
                  <p className="text-[11px] text-slate-400">Distribution of enquiries by triage status</p>
                </div>
                <Link
                  href="/admin/leads"
                  className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <span>Filter Leads</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>

              {data.byStatus.length === 0 ? (
                <p className="text-xs text-slate-500 py-6 text-center">No submissions recorded yet.</p>
              ) : (
                <div className="space-y-3.5">
                  {data.byStatus.map(({ _id, count }) => {
                    const pct = data.summary.total > 0 ? Math.round((count / data.summary.total) * 100) : 0;
                    return (
                      <div key={_id}>
                        <div className="flex justify-between text-xs mb-1 font-medium">
                          <span className="text-slate-300">{_id}</span>
                          <span className="font-mono text-slate-400">
                            {count} ({pct}%)
                          </span>
                        </div>
                        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Top Recommended Services Panel */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight">
                    Engineering Squad Demand
                  </h3>
                  <p className="text-[11px] text-slate-400">Top recommended Cynbit technical domains</p>
                </div>
                <Link
                  href="/admin/analytics"
                  className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <span>Analytics</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>

              {data.byService.length === 0 ? (
                <p className="text-xs text-slate-500 py-6 text-center">No service diagnosis generated yet.</p>
              ) : (
                <div className="space-y-3">
                  {data.byService.slice(0, 5).map(({ _id, count }, i) => (
                    <div
                      key={_id}
                      className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/70 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <span className="w-5 h-5 rounded-md bg-slate-800 text-cyan-400 flex items-center justify-center text-[10px] font-mono font-bold flex-shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-slate-200 font-medium truncate">{_id}</span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0 font-mono">
                        <span className="font-bold text-cyan-400">{count}</span>
                        <span className="text-slate-500 text-[10px]">leads</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions Bar */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-white mb-1">Direct Lead Pipeline Shortcuts</h3>
              <p className="text-xs text-slate-400">Filter incoming queue directly by operational criteria.</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/admin/leads?status=New"
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors"
              >
                New Queue ({data.summary.newLeads})
              </Link>
              <Link
                href="/admin/leads?priority=High"
                className="px-3.5 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 text-xs font-semibold border border-rose-800/80 transition-colors"
              >
                High Priority ({data.summary.highPriority})
              </Link>
              <Link
                href="/admin/leads"
                className="px-3.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-bold border border-cyan-500/40 transition-colors flex items-center gap-1.5"
              >
                <span>View Full Registry</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </AdminLayout>
  );
}
