'use client';
// src/app/admin/analytics/page.tsx — Lead analytics dashboard

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/dashboard/AdminLayout';
import { AnalyticsData } from '@/types';
import { PRIORITY_COLORS, STATUS_COLORS } from '@/constants';
import { BarChart2 } from 'lucide-react';

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/analytics')
      .then(r => r.json())
      .then(j => { if (j.success) setData(j.data); })
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1a1a2e]">Analytics</h1>
        <p className="text-gray-500 text-sm mt-1">Insights calculated from real MongoDB records</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <span className="w-6 h-6 border-2 border-gray-200 border-t-[#1a1a2e] rounded-full animate-spin" />
        </div>
      ) : !data || data.summary.total === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <BarChart2 className="w-12 h-12 text-gray-200 mx-auto mb-4" />
          <h2 className="font-bold text-gray-400 mb-2">No data yet</h2>
          <p className="text-sm text-gray-400">Analytics will appear here once project enquiries are submitted.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Summary row */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: 'Total', value: data.summary.total, color: 'bg-[#1a1a2e]' },
              { label: 'New', value: data.summary.newLeads, color: 'bg-blue-500' },
              { label: 'High Priority', value: data.summary.highPriority, color: 'bg-red-500' },
              { label: 'In Progress', value: data.summary.inProgress, color: 'bg-orange-500' },
              { label: 'Completed', value: data.summary.completed, color: 'bg-green-500' },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
                <p className="text-sm text-gray-500 mb-1">{label}</p>
                <p className={`text-3xl font-black`}>{value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Priority distribution */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-bold text-[#1a1a2e] mb-5">Priority Distribution</h2>
              <div className="space-y-4">
                {data.byPriority.map(({ _id, count }) => (
                  <div key={_id}>
                    <div className="flex justify-between mb-1.5">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${PRIORITY_COLORS[_id]}`}>{_id}</span>
                      <span className="text-sm font-bold text-[#1a1a2e]">{count} ({Math.round((count / data.summary.total) * 100)}%)</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${_id === 'High' ? 'bg-red-400' : _id === 'Medium' ? 'bg-yellow-400' : 'bg-green-400'}`}
                        style={{ width: `${(count / data.summary.total) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status distribution */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-bold text-[#1a1a2e] mb-5">Status Distribution</h2>
              <div className="space-y-3">
                {data.byStatus.map(({ _id, count }) => (
                  <div key={_id} className="flex items-center justify-between gap-4">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${STATUS_COLORS[_id as keyof typeof STATUS_COLORS] ?? 'bg-gray-100 text-gray-600'}`}>{_id}</span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#0ea5e9] rounded-full" style={{ width: `${(count / data.summary.total) * 100}%` }} />
                    </div>
                    <span className="text-sm font-bold text-[#1a1a2e] w-6 text-right">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top project goals */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-bold text-[#1a1a2e] mb-5">Top Project Goals</h2>
              {data.byGoal.length === 0 ? <p className="text-sm text-gray-400">No data</p> : (
                <div className="space-y-3">
                  {data.byGoal.slice(0, 6).map(({ _id, count }, i) => (
                    <div key={_id} className="flex items-center gap-3">
                      <span className="text-xs font-bold text-gray-400 w-4">{i + 1}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#1a1a2e] truncate">{_id}</p>
                        <div className="h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
                          <div className="h-full bg-[#1a1a2e] rounded-full" style={{ width: `${(count / data.summary.total) * 100}%` }} />
                        </div>
                      </div>
                      <span className="text-sm font-bold text-[#1a1a2e] flex-shrink-0">{count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Top services */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-bold text-[#1a1a2e] mb-5">Most Recommended Services</h2>
              {data.byService.length === 0 ? <p className="text-sm text-gray-400">No data</p> : (
                <div className="space-y-3">
                  {data.byService.map(({ _id, count }, i) => (
                    <div key={_id} className="flex items-center gap-3">
                      <span className="text-xs font-bold text-gray-400 w-4">{i + 1}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#1a1a2e] truncate">{_id}</p>
                        <div className="h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
                          <div className="h-full bg-[#0ea5e9] rounded-full" style={{ width: `${(count / data.summary.total) * 100}%` }} />
                        </div>
                      </div>
                      <span className="text-sm font-bold text-[#1a1a2e] flex-shrink-0">{count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Enquiries over time */}
          {data.byDate.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-bold text-[#1a1a2e] mb-5">Enquiries Over Time (Last 30 Days)</h2>
              <div className="flex items-end gap-1 h-32">
                {data.byDate.map(({ _id, count }) => {
                  const max = Math.max(...data.byDate.map(d => d.count));
                  const pct = max === 0 ? 0 : (count / max) * 100;
                  return (
                    <div key={_id} className="flex-1 flex flex-col items-center gap-1 group relative">
                      <div
                        className="w-full bg-[#0ea5e9] rounded-t transition-all hover:bg-[#0284c7]"
                        style={{ height: `${Math.max(4, pct)}%` }}
                        title={`${_id}: ${count}`}
                      />
                      <span className="text-[8px] text-gray-400 hidden group-hover:block absolute -bottom-4">{_id.slice(5)}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between mt-4 text-xs text-gray-400">
                <span>{data.byDate[0]?._id}</span>
                <span>{data.byDate[data.byDate.length - 1]?._id}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
}

