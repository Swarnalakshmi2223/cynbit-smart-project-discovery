// src/app/api/admin/analytics/route.ts
// GET /api/admin/analytics — Dashboard analytics from real MongoDB data

import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Lead from '@/models/Lead';
import { getAuthPayload } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const payload = await getAuthPayload();
    if (!payload) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const [
      total,
      newLeads,
      highPriority,
      inProgress,
      completed,
      byStatus,
      byPriority,
      byService,
      byGoal,
      byDate,
    ] = await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ status: 'New' }),
      Lead.countDocuments({ priorityLevel: 'High' }),
      Lead.countDocuments({ status: 'In Progress' }),
      Lead.countDocuments({ status: 'Completed' }),
      Lead.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
      Lead.aggregate([{ $group: { _id: '$priorityLevel', count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
      Lead.aggregate([{ $group: { _id: '$recommendedService', count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
      Lead.aggregate([{ $group: { _id: '$projectGoal', count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
      Lead.aggregate([
        {
          $group: {
            _id: {
              $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
        { $limit: 30 },
      ]),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        summary: { total, newLeads, highPriority, inProgress, completed },
        byStatus,
        byPriority,
        byService,
        byGoal,
        byDate,
      },
    });
  } catch (err) {
    console.error('[GET /api/admin/analytics]', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
