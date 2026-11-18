'use client';
// src/app/admin/dashboard/page.tsx — Admin dashboard overview

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/dashboard/AdminLayout';
import { AnalyticsData } from '@/types';
import { Users, AlertCircle, TrendingUp, Clock, CheckCircle, ArrowRight } from 'lucide-react';

function StatCard({ label, value, icon: Icon, color }: {
  label: string; value: number; icon: React.ComponentType<{ className?: string }>; color: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <div className={`w-9 h-9 ${color} rounded-xl flex items-center justify-center`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
      </div>
      <p className="text-3xl font-black text-[#1a1a2e]">{value}</p>
    </div>
  );
}

export default function DashboardPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/analytics')
      .then(r => r.json())
      .then(j => { if (j.success) setData(j.data); else setError(j.error); })
      .catch(() => setError('Failed to load analytics'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1a1a2e]">Dashboard Overview</h1>
        <p className="text-gray-500 text-sm mt-1">Monitor and manage all project enquiries</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 h-28 animate-pulse bg-gray-100" />
          ))}
        </div>
      ) : error ? (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>
      ) : data ? (
        <>
          {/* Summary cards */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <StatCard label="Total Enquiries" value={data.summary.total} icon={Users} color="bg-[#1a1a2e]" />
            <StatCard label="New Enquiries" value={data.summary.newLeads} icon={Clock} color="bg-blue-500" />
            <StatCard label="High Priority" value={data.summary.highPriority} icon={AlertCircle} color="bg-red-500" />
            <StatCard label="In Progress" value={data.summary.inProgress} icon={TrendingUp} color="bg-orange-500" />
            <StatCard label="Completed" value={data.summary.completed} icon={CheckCircle} color="bg-green-500" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* By Status */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-bold text-[#1a1a2e] mb-4">Enquiries by Status</h2>
              {data.byStatus.length === 0 ? (
                <p className="text-gray-400 text-sm">No data yet</p>
              ) : (
                <div className="space-y-3">
                  {data.byStatus.map(({ _id, count }) => (
                    <div key={_id} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{_id}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#0ea5e9] rounded-full"
                            style={{ width: `${(count / data.summary.total) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-[#1a1a2e] w-6 text-right">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* By Service */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-bold text-[#1a1a2e] mb-4">Top Recommended Services</h2>
              {data.byService.length === 0 ? (
                <p className="text-gray-400 text-sm">No data yet</p>
              ) : (
                <div className="space-y-3">
                  {data.byService.slice(0, 5).map(({ _id, count }) => (
                    <div key={_id} className="flex items-center justify-between gap-3">
                      <span className="text-sm text-gray-600 leading-tight flex-1">{_id}</span>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#1a1a2e] rounded-full"
                            style={{ width: `${(count / data.summary.total) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-[#1a1a2e] w-5 text-right">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-[#1a1a2e] mb-4">Quick Actions</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/admin/leads" className="inline-flex items-center gap-2 bg-[#1a1a2e] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#16213e] transition-colors">
                View All Leads <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/admin/leads?status=New" className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-blue-100 transition-colors">
                New Leads ({data.summary.newLeads})
              </Link>
              <Link href="/admin/leads?priority=High" className="inline-flex items-center gap-2 bg-red-50 text-red-700 text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-red-100 transition-colors">
                High Priority ({data.summary.highPriority})
              </Link>
              <Link href="/admin/analytics" className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-gray-200 transition-colors">
                View Analytics
              </Link>
            </div>
          </div>
        </>
      ) : null}
    </AdminLayout>
  );
}

