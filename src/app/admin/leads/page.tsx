'use client';
// src/app/admin/leads/page.tsx — Lead management table

import { useEffect, useState, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '@/components/dashboard/AdminLayout';
import { Lead, LeadStatus, PriorityLevel } from '@/types';
import { STATUS_COLORS, PRIORITY_COLORS, LEAD_STATUSES, RECOMMENDED_SERVICES } from '@/constants';
import { Search, ChevronLeft, ChevronRight, ExternalLink, Filter } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export const dynamic = 'force-dynamic';

function LeadsContent() {
  const sp = useSearchParams();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 10, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(sp.get('search') ?? '');
  const [status, setStatus] = useState<string>(sp.get('status') ?? '');
  const [priority, setPriority] = useState<string>(sp.get('priority') ?? '');
  const [service, setService] = useState<string>(sp.get('service') ?? '');
  const [page, setPage] = useState(1);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (status) params.set('status', status);
    if (priority) params.set('priority', priority);
    if (service) params.set('service', service);
    params.set('page', String(page));
    params.set('limit', '10');
    try {
      const res = await fetch(`/api/admin/leads?${params}`);
      const json = await res.json();
      if (json.success) {
        setLeads(json.data.leads);
        setPagination(json.data.pagination);
      }
    } finally {
      setLoading(false);
    }
  }, [search, status, priority, service, page]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setPage(1);
    fetchLeads();
  }

  function resetFilters() {
    setSearch(''); setStatus(''); setPriority(''); setService(''); setPage(1);
  }

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a2e]">Lead Management</h1>
          <p className="text-gray-500 text-sm mt-1">{pagination.total} total enquiries</p>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-4">
        <form onSubmit={handleSearch} className="flex gap-3 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, email, company or reference ID..."
              className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
            />
          </div>
          <button type="submit" className="px-4 py-2.5 bg-[#1a1a2e] text-white rounded-xl text-sm font-semibold hover:bg-[#16213e] transition-colors">
            Search
          </button>
        </form>
        <div className="flex flex-wrap gap-3 items-center">
          <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <select value={status} onChange={e => { setStatus(e.target.value); setPage(1); }} className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]">
            <option value="">All Statuses</option>
            {LEAD_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={priority} onChange={e => { setPriority(e.target.value); setPage(1); }} className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]">
            <option value="">All Priorities</option>
            {(['High', 'Medium', 'Low'] as PriorityLevel[]).map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <select value={service} onChange={e => { setService(e.target.value); setPage(1); }} className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] max-w-48">
            <option value="">All Services</option>
            {RECOMMENDED_SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          {(search || status || priority || service) && (
            <button onClick={resetFilters} className="text-xs text-red-500 hover:text-red-700 font-medium underline">
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <span className="w-6 h-6 border-2 border-gray-200 border-t-[#1a1a2e] rounded-full animate-spin inline-block" />
            <p className="mt-3 text-sm text-gray-400">Loading leads...</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-400 font-medium">No leads found</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Reference</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Company</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden xl:table-cell">Budget</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Priority</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Date</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {leads.map(lead => (
                  <tr key={lead._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs font-bold text-[#0ea5e9]">{lead.referenceId}</span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-[#1a1a2e]">{lead.fullName}</p>
                      <p className="text-xs text-gray-400">{lead.email}</p>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-gray-600">{lead.companyName}</td>
                    <td className="px-4 py-3 hidden xl:table-cell text-gray-600 text-xs">{lead.budgetRange}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${PRIORITY_COLORS[lead.priorityLevel]}`}>
                        {lead.priorityLevel}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[lead.status as LeadStatus]}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-xs text-gray-400">
                      {formatDate(lead.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/leads/${lead._id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#0ea5e9] hover:text-[#0284c7]"
                      >
                        View <ExternalLink className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!loading && pagination.totalPages > 1 && (
          <div className="border-t border-gray-100 px-4 py-3 flex items-center justify-between">
            <p className="text-xs text-gray-400">
              Showing {((page - 1) * 10) + 1}–{Math.min(page * 10, pagination.total)} of {pagination.total}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(p => p - 1)}
                disabled={page === 1}
                className="p-1.5 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-3 py-1.5 text-sm font-medium">{page}/{pagination.totalPages}</span>
              <button
                onClick={() => setPage(p => p + 1)}
                disabled={page === pagination.totalPages}
                className="p-1.5 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function LeadsPage() {
  return (
    <AdminLayout>
      <Suspense fallback={<div className="p-12 text-center text-sm text-gray-400">Loading leads table...</div>}>
        <LeadsContent />
      </Suspense>
    </AdminLayout>
  );
}
