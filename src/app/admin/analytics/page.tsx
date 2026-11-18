'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/dashboard/AdminLayout';
import { AnalyticsData } from '@/types';
import { PRIORITY_COLORS, STATUS_COLORS } from '@/constants';
import {
  BarChart3, TrendingUp, Sparkles, PieChart, Calendar,
  Layers, ArrowUpRight, ShieldCheck, Activity
} from 'lucide-react';

const PRIORITY_BARS: Record<string, string> = {
  High: 'from-rose-500 to-rose-400',
  Medium: 'from-amber-500 to-amber-400',
  Low: 'from-emerald-500 to-emerald-400',
};

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/analytics')
      .then((r) => r.json())
      .then((j) => {
        if (j.success) setData(j.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout>
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold mb-1.5">
          <Activity className="w-3 h-3" />
          <span>MongoDB Aggregation Metrics</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Lead Pipeline Analytics
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Dynamic statistics computed from persistent database records with zero hardcoding.
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 text-slate-500 space-y-3">
          <span className="w-6 h-6 border-2 border-slate-800 border-t-cyan-400 rounded-full animate-spin" />
          <p className="text-xs font-mono">Aggregating database pipelines...</p>
        </div>
      ) : !data || data.summary.total === 0 ? (
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-16 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto text-slate-500">
            <BarChart3 className="w-6 h-6" />
          </div>
          <h2 className="text-sm font-bold text-slate-300">No Enquiry Records Aggregated Yet</h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Once prospective clients submit discovery forms, the aggregation pipeline will generate dynamic distribution graphs.
          </p>
        </div>
      ) : (
        <div className="space-y-6 animate-enter">
          {/* Top Summary Banner */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
            {[
              { label: 'Total Volume', value: data.summary.total, color: 'text-white' },
              { label: 'New Intake', value: data.summary.newLeads, color: 'text-blue-400' },
              { label: 'High Priority', value: data.summary.highPriority, color: 'text-rose-400' },
              { label: 'In Progress', value: data.summary.inProgress, color: 'text-amber-400' },
              { label: 'Completed', value: data.summary.completed, color: 'text-emerald-400' },
            ].map(({ label, value, color }) => (
              <div key={label} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <span className="text-[11px] font-medium text-slate-400 block mb-1">{label}</span>
                <span className={`text-2xl font-mono font-black ${color}`}>{value}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Priority Distribution */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                    Lead Priority Qualification
                  </h3>
                  <p className="text-[11px] text-slate-400">Scored automatically via requirement engine</p>
                </div>
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </div>

              <div className="space-y-3.5">
                {data.byPriority.map(({ _id, count }) => {
                  const pct = data.summary.total > 0 ? Math.round((count / data.summary.total) * 100) : 0;
                  const barGradient = PRIORITY_BARS[_id] || 'from-cyan-500 to-blue-500';

                  return (
                    <div key={_id}>
                      <div className="flex justify-between text-xs mb-1 font-semibold">
                        <span className="text-slate-300">{_id} Priority</span>
                        <span className="font-mono text-cyan-400">
                          {count} ({pct}%)
                        </span>
                      </div>
                      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${barGradient} rounded-full transition-all duration-500`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Lifecycle Status Distribution */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                    Operational Status Pipeline
                  </h3>
                  <p className="text-[11px] text-slate-400">Live progress stage of submitted leads</p>
                </div>
                <TrendingUp className="w-4 h-4 text-cyan-400" />
              </div>

              <div className="space-y-3">
                {data.byStatus.map(({ _id, count }) => {
                  const pct = data.summary.total > 0 ? Math.round((count / data.summary.total) * 100) : 0;
                  return (
                    <div key={_id} className="flex items-center justify-between gap-3 text-xs">
                      <span className="text-slate-300 font-medium w-28 truncate">{_id}</span>
                      <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-sky-500 rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="font-mono text-slate-400 w-8 text-right font-bold">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Project Goals */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                    Most Requested Business Goals
                  </h3>
                  <p className="text-[11px] text-slate-400">Customer objective demand distribution</p>
                </div>
                <Layers className="w-4 h-4 text-cyan-400" />
              </div>

              <div className="space-y-2.5">
                {data.byGoal.slice(0, 5).map(({ _id, count }, i) => (
                  <div
                    key={_id}
                    className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <span className="w-5 h-5 rounded-md bg-slate-800 text-cyan-400 flex items-center justify-center text-[10px] font-mono font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-slate-200 font-medium truncate">{_id}</span>
                    </div>
                    <span className="font-mono font-bold text-cyan-400 flex-shrink-0">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Most Recommended Services */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                    Recommended Technical Squads
                  </h3>
                  <p className="text-[11px] text-slate-400">Service domain alignment frequency</p>
                </div>
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </div>

              <div className="space-y-2.5">
                {data.byService.map(({ _id, count }, i) => (
                  <div
                    key={_id}
                    className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <span className="w-5 h-5 rounded-md bg-slate-800 text-cyan-400 flex items-center justify-center text-[10px] font-mono font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-slate-200 font-medium truncate">{_id}</span>
                    </div>
                    <span className="font-mono font-bold text-cyan-400 flex-shrink-0">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 30-Day Volume Timeline */}
          {data.byDate.length > 0 && (
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                    30-Day Intake Timeline
                  </h3>
                  <p className="text-[11px] text-slate-400">Enquiries received chronologically</p>
                </div>
                <Calendar className="w-4 h-4 text-cyan-400" />
              </div>

              <div className="flex items-end gap-1.5 h-36 pt-4">
                {data.byDate.map(({ _id, count }) => {
                  const max = Math.max(...data.byDate.map((d) => d.count), 1);
                  const heightPct = Math.max(10, Math.round((count / max) * 100));

                  return (
                    <div key={_id} className="flex-1 flex flex-col items-center gap-1 group relative">
                      <div
                        className="w-full bg-gradient-to-t from-cyan-600 to-sky-400 rounded-t-md transition-all hover:brightness-125"
                        style={{ height: `${heightPct}%` }}
                        title={`${_id}: ${count} leads`}
                      />
                      <span className="text-[9px] font-mono text-slate-500 truncate w-full text-center">
                        {_id.slice(5)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
}
