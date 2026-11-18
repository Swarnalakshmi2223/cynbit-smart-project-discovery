'use client';

import { useEffect, useState, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '@/components/dashboard/AdminLayout';
import { Lead, LeadStatus, PriorityLevel } from '@/types';
import { STATUS_COLORS, PRIORITY_COLORS, LEAD_STATUSES, RECOMMENDED_SERVICES } from '@/constants';
import {
  Search, ChevronLeft, ChevronRight, ExternalLink, Filter,
  RefreshCw, Users, ShieldAlert, ArrowUpRight, X, Clock
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

export const dynamic = 'force-dynamic';

const STATUS_CHIPS: Record<LeadStatus, string> = {
  New: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  'Under Review': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  Contacted: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  'In Progress': 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  Completed: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  Rejected: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
};

const PRIORITY_CHIPS: Record<string, string> = {
  High: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
  Medium: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  Low: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
};

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

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setPage(1);
    fetchLeads();
  }

  function resetFilters() {
    setSearch('');
    setStatus('');
    setPriority('');
    setService('');
    setPage(1);
  }

  return (
    <div className="space-y-6 animate-enter">
      {/* Top Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Enquiry Leads Registry
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Displaying <span className="font-mono text-cyan-400 font-bold">{pagination.total}</span> total customer submissions across all stages.
          </p>
        </div>

        <button
          onClick={() => fetchLeads()}
          className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 flex items-center gap-1.5 self-start sm:self-auto transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Database</span>
        </button>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by client name, email, company, or reference ID..."
              className="w-full rounded-xl bg-slate-950 border border-slate-800 pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors"
          >
            Search
          </button>
        </form>

        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-800/60 text-xs">
          <div className="flex items-center gap-1.5 text-slate-400 mr-2">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-semibold text-[11px] uppercase tracking-wider">Filters:</span>
          </div>

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="rounded-xl bg-slate-950 border border-slate-800 px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="">All Statuses</option>
            {LEAD_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            value={priority}
            onChange={(e) => {
              setPriority(e.target.value);
              setPage(1);
            }}
            className="rounded-xl bg-slate-950 border border-slate-800 px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="">All Priorities</option>
            {(['High', 'Medium', 'Low'] as PriorityLevel[]).map((p) => (
              <option key={p} value={p}>
                {p} Priority
              </option>
            ))}
          </select>

          <select
            value={service}
            onChange={(e) => {
              setService(e.target.value);
              setPage(1);
            }}
            className="rounded-xl bg-slate-950 border border-slate-800 px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 max-w-xs"
          >
            <option value="">All Service Domains</option>
            {RECOMMENDED_SERVICES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          {(search || status || priority || service) && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-[11px] text-rose-400 hover:text-rose-300 font-semibold ml-auto px-2 py-1 rounded-lg hover:bg-rose-950/40"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Data Table */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 shadow-xl overflow-hidden">
        {loading ? (
          <div className="p-16 text-center text-slate-500 space-y-3">
            <span className="w-6 h-6 border-2 border-slate-800 border-t-cyan-400 rounded-full animate-spin inline-block" />
            <p className="text-xs font-mono">Querying MongoDB Atlas collection...</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="p-16 text-center space-y-2">
            <p className="text-sm font-bold text-slate-300">No matching enquiries found</p>
            <p className="text-xs text-slate-500">Try adjusting your keyword query or resetting filter presets.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-3.5 px-4 font-bold">Reference Key</th>
                  <th className="py-3.5 px-4 font-bold">Client / Contact</th>
                  <th className="py-3.5 px-4 font-bold hidden lg:table-cell">Company</th>
                  <th className="py-3.5 px-4 font-bold">Service Match</th>
                  <th className="py-3.5 px-4 font-bold">Priority</th>
                  <th className="py-3.5 px-4 font-bold">Stage</th>
                  <th className="py-3.5 px-4 font-bold hidden md:table-cell">Logged Date</th>
                  <th className="py-3.5 px-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70">
                {leads.map((lead) => (
                  <tr
                    key={lead._id}
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">
                      {lead.referenceId}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white leading-snug">{lead.fullName}</div>
                      <div className="text-[11px] text-slate-400 font-normal">{lead.email}</div>
                    </td>

                    <td className="py-3.5 px-4 hidden lg:table-cell text-slate-300 font-medium">
                      {lead.companyName}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="text-[11px] font-semibold text-slate-300 line-clamp-1 max-w-[200px]" title={lead.recommendedService}>
                        {lead.recommendedService}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                          PRIORITY_CHIPS[lead.priorityLevel] || 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {lead.priorityLevel}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                          STATUS_CHIPS[lead.status as LeadStatus] || 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 hidden md:table-cell text-slate-400 font-mono text-[11px]">
                      {formatDate(lead.createdAt)}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/admin/leads/${lead._id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 group-hover:bg-cyan-500/20 text-slate-300 group-hover:text-cyan-300 border border-slate-700 group-hover:border-cyan-500/40 text-[11px] font-bold transition-all"
                      >
                        <span>Dossier</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Bar */}
        {!loading && pagination.totalPages > 1 && (
          <div className="p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>
              Showing {((page - 1) * 10) + 1}–{Math.min(page * 10, pagination.total)} of {pagination.total} leads
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPage((p) => p - 1)}
                disabled={page === 1}
                className="p-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4 text-slate-300" />
              </button>

              <span className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 font-mono text-cyan-400 font-bold">
                {page} / {pagination.totalPages}
              </span>

              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page === pagination.totalPages}
                className="p-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4 text-slate-300" />
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
      <Suspense fallback={<div className="p-12 text-center text-xs font-mono text-slate-500">Loading pipeline...</div>}>
        <LeadsContent />
      </Suspense>
    </AdminLayout>
  );
}
