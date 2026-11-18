'use client';
// src/app/admin/leads/[id]/page.tsx — Lead detail page

import { useEffect, useState, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '@/components/dashboard/AdminLayout';
import { Lead, LeadStatus } from '@/types';
import { STATUS_COLORS, PRIORITY_COLORS, LEAD_STATUSES } from '@/constants';
import { ArrowLeft, Save } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export const dynamic = 'force-dynamic';

function InfoRow({ label, value }: { label: string; value?: string | number | boolean }) {
  if (!value && value !== 0) return null;
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-3 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-500 sm:w-48 flex-shrink-0 font-medium">{label}</span>
      <span className="text-sm text-[#1a1a2e] flex-1">{String(value)}</span>
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
      .then(r => r.json())
      .then(j => {
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
        setSaveMsg('Status updated successfully!');
        setTimeout(() => setSaveMsg(''), 3000);
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="flex items-center justify-center h-64"><span className="w-6 h-6 border-2 border-gray-200 border-t-[#1a1a2e] rounded-full animate-spin" /></div>;
  if (!lead) return null;

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/leads" className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-[#1a1a2e]">Lead Detail</h1>
          <p className="text-sm font-mono text-[#0ea5e9]">{lead.referenceId}</p>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${PRIORITY_COLORS[lead.priorityLevel]}`}>
            {lead.priorityLevel} Priority
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[lead.status as LeadStatus]}`}>
            {lead.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main details */}
        <div className="xl:col-span-2 space-y-5">
          {/* Customer info */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-[#1a1a2e] mb-4">Customer Information</h2>
            <InfoRow label="Full Name" value={lead.fullName} />
            <InfoRow label="Email" value={lead.email} />
            <InfoRow label="Phone" value={lead.phone} />
            <InfoRow label="Preferred Contact" value={lead.preferredContactMethod} />
            {lead.additionalMessage && <InfoRow label="Additional Message" value={lead.additionalMessage} />}
          </div>

          {/* Business info */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-[#1a1a2e] mb-4">Business Information</h2>
            <InfoRow label="Company" value={lead.companyName} />
            <InfoRow label="Industry" value={lead.industry} />
            <InfoRow label="Company Size" value={lead.companySize} />
            <InfoRow label="Website" value={lead.website} />
            <InfoRow label="Current Systems" value={lead.currentSystems} />
          </div>

          {/* Project requirements */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-[#1a1a2e] mb-4">Project Requirements</h2>
            <InfoRow label="Project Goal" value={lead.projectGoal} />
            <div className="py-3 border-b border-gray-100">
              <p className="text-sm text-gray-500 font-medium mb-2">Project Description</p>
              <p className="text-sm text-[#1a1a2e] leading-relaxed bg-gray-50 p-3 rounded-xl">{lead.projectDescription}</p>
            </div>
            <InfoRow label="Required Features" value={lead.requiredFeatures} />
            <InfoRow label="Current Challenges" value={lead.currentChallenges} />
            <InfoRow label="Expected Outcome" value={lead.expectedOutcome} />
            <InfoRow label="Integration Requirements" value={lead.integrationRequirements} />
          </div>

          {/* Budget & timeline */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-[#1a1a2e] mb-4">Budget & Timeline</h2>
            <InfoRow label="Budget Range" value={lead.budgetRange} />
            <InfoRow label="Expected Timeline" value={lead.expectedTimeline} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Recommendation */}
          <div className="bg-[#1a1a2e] rounded-2xl p-5 text-white">
            <h2 className="font-bold mb-4 text-sm uppercase tracking-wider text-gray-400">Recommendation</h2>
            <p className="font-bold text-lg mb-2">{lead.recommendedService}</p>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-[#0ea5e9] rounded-full" style={{ width: `${lead.priorityScore}%` }} />
              </div>
              <span className="text-sm font-bold">{lead.priorityScore}/100</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">{lead.recommendationReason}</p>
          </div>

          {/* Status update */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="font-bold text-[#1a1a2e] mb-4">Update Status</h2>
            <select
              value={newStatus}
              onChange={e => setNewStatus(e.target.value as LeadStatus)}
              className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] mb-3"
            >
              {LEAD_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <button
              onClick={handleStatusUpdate}
              disabled={saving || newStatus === lead.status}
              className="w-full flex items-center justify-center gap-2 bg-[#1a1a2e] text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-[#16213e] transition-colors disabled:opacity-60"
            >
              {saving ? <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
              Save Status
            </button>
            {saveMsg && <p className="mt-2 text-xs text-green-600 text-center">{saveMsg}</p>}
          </div>

          {/* Submission details */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="font-bold text-[#1a1a2e] mb-4">Submission Details</h2>
            <div className="space-y-2">
              <div className="flex justify-between text-xs"><span className="text-gray-500">Submitted</span><span className="font-medium">{formatDate(lead.createdAt)}</span></div>
              <div className="flex justify-between text-xs"><span className="text-gray-500">Last Updated</span><span className="font-medium">{formatDate(lead.updatedAt)}</span></div>
              <div className="flex justify-between text-xs"><span className="text-gray-500">Privacy Consent</span><span className="font-medium text-green-600">{lead.privacyConsent ? 'Agreed' : 'Not provided'}</span></div>
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
      <Suspense fallback={<div className="flex items-center justify-center h-64"><span className="w-6 h-6 border-2 border-gray-200 border-t-[#1a1a2e] rounded-full animate-spin" /></div>}>
        <LeadDetailContent />
      </Suspense>
    </AdminLayout>
  );
}
