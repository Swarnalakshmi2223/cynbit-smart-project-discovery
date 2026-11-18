'use client';

import { useEffect, useState, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '@/components/dashboard/AdminLayout';
import { Lead, LeadStatus } from '@/types';
import { LEAD_STATUSES } from '@/constants';
import {
  ArrowLeft, Save, Sparkles, Building, Mail, Phone,
  Calendar, CheckCircle2, AlertCircle, Clock, ShieldCheck,
  TrendingUp, Compass, MessageSquare
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

export const dynamic = 'force-dynamic';

function SectionCard({ title, icon: Icon, children }: {
  title: string; icon: React.ComponentType<{ className?: string }>; children: React.ReactNode;
}) {
  return (
    <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-800 text-white font-bold text-xs uppercase tracking-wider">
        <Icon className="w-4 h-4 text-cyan-400" />
        <span>{title}</span>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function DataRow({ label, value, isMono }: { label: string; value?: string | number | boolean; isMono?: boolean }) {
  if (value === undefined || value === null || value === '') return null;
  return (
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 text-xs">
      <span className="text-slate-500 font-medium">{label}</span>
      <span className={`text-slate-200 font-semibold text-right max-w-sm ${isMono ? 'font-mono text-cyan-300' : ''}`}>
        {String(value)}
      </span>
    </div>
  );
}

function LeadDetailContent() {
  const { id } = useParams();
  const router = useRouter();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [newStatus, setNewStatus] = useState<LeadStatus>('New');
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  useEffect(() => {
    fetch(`/api/admin/leads/${id}`)
      .then((r) => r.json())
      .then((j) => {
        if (j.success) {
          setLead(j.data);
          setNewStatus(j.data.status);
        } else {
          router.push('/admin/leads');
        }
      })
      .catch(() => router.push('/admin/leads'))
      .finally(() => setLoading(false));
  }, [id, router]);

  async function handleStatusUpdate() {
    if (!lead || newStatus === lead.status) return;
    setSaving(true);
    setSaveMsg('');

    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const json = await res.json();
      if (json.success) {
        setLead(json.data);
        setNewStatus(json.data.status);
        setSaveMsg('Status committed to MongoDB Atlas successfully.');
        setTimeout(() => setSaveMsg(''), 4000);
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-500 space-y-3">
        <span className="w-6 h-6 border-2 border-slate-800 border-t-cyan-400 rounded-full animate-spin" />
        <p className="text-xs font-mono">Fetching enquiry dossier...</p>
      </div>
    );
  }

  if (!lead) return null;

  return (
    <div className="space-y-6 animate-enter">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/leads"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-white">{lead.fullName}</h1>
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60">
                {lead.referenceId}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Logged on {formatDate(lead.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
            {lead.priorityLevel} Priority ({lead.priorityScore}/100)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details (Left 2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Scope Description */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Core Project Scope & Requirements
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              {lead.projectDescription}
            </p>

            {lead.requiredFeatures && (
              <div className="pt-2">
                <span className="text-xs font-semibold text-slate-400 block mb-1">Key Specific Features:</span>
                <p className="text-xs text-slate-300 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/60 font-mono">
                  {lead.requiredFeatures}
                </p>
              </div>
            )}
          </div>

          {/* Client & Business Demographics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <SectionCard title="Contact Profile" icon={Mail}>
              <DataRow label="Full Name" value={lead.fullName} />
              <DataRow label="Email Address" value={lead.email} />
              <DataRow label="Direct Phone" value={lead.phone} />
              <DataRow label="Preferred Channel" value={lead.preferredContactMethod} />
              {lead.additionalMessage && (
                <div className="pt-2 border-t border-slate-800/60">
                  <span className="text-[11px] text-slate-400 block mb-1">Client Message:</span>
                  <p className="text-xs text-slate-300 italic">{lead.additionalMessage}</p>
                </div>
              )}
            </SectionCard>

            <SectionCard title="Business Parameters" icon={Building}>
              <DataRow label="Company Name" value={lead.companyName} />
              <DataRow label="Industry" value={lead.industry} />
              <DataRow label="Scale" value={lead.companySize} />
              <DataRow label="Website" value={lead.website || 'Not provided'} />
              <DataRow label="Current Systems" value={lead.currentSystems || 'None specified'} />
            </SectionCard>
          </div>

          {/* Commercial & Timing Parameters */}
          <SectionCard title="Commercial & Execution Parameters" icon={Calendar}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DataRow label="Budget Allocation Bracket" value={lead.budgetRange} isMono />
              <DataRow label="Expected Delivery Target" value={lead.expectedTimeline} isMono />
            </div>
            {lead.currentChallenges && (
              <div className="pt-2 border-t border-slate-800/60">
                <span className="text-[11px] text-slate-400 block mb-1">Stated Bottlenecks:</span>
                <p className="text-xs text-slate-300">{lead.currentChallenges}</p>
              </div>
            )}
          </SectionCard>
        </div>

        {/* Status Control & Recommendation Sidebar (Right col) */}
        <div className="space-y-6">
          {/* Status Pipeline Controller */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Update Lifecycle Stage</span>
            </h3>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                Current Pipeline Stage
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as LeadStatus)}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-semibold"
              >
                {LEAD_STATUSES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleStatusUpdate}
              disabled={saving || newStatus === lead.status}
              className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                  <span>Committing...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Stage to Database</span>
                </>
              )}
            </button>

            {saveMsg && (
              <p className="text-[11px] text-emerald-400 text-center font-medium bg-emerald-950/40 p-2 rounded-lg border border-emerald-800/60">
                {saveMsg}
              </p>
            )}
          </div>

          {/* Recommendation Engine Verdict */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
              <Sparkles className="w-4 h-4" />
              <span>Diagnostic Recommendation</span>
            </div>

            <div>
              <span className="text-[11px] text-slate-500 font-mono block">Recommended Squad</span>
              <p className="text-sm font-extrabold text-white mt-0.5">{lead.recommendedService}</p>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1 font-mono">
                <span className="text-slate-400">Score</span>
                <span className="text-cyan-400 font-bold">{lead.priorityScore} / 100</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                  style={{ width: `${lead.priorityScore}%` }}
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/60 text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-300 block mb-1">Reasoning Rationale:</strong>
              {lead.recommendationReason}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LeadDetailPage() {
  return (
    <AdminLayout>
      <Suspense fallback={<div className="p-12 text-center text-xs font-mono text-slate-500">Loading dossier...</div>}>
        <LeadDetailContent />
      </Suspense>
    </AdminLayout>
  );
}
