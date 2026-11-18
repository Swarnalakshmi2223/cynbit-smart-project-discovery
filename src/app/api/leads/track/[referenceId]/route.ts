// src/app/api/leads/track/[referenceId]/route.ts
// GET /api/leads/track/[referenceId] — Public enquiry tracking (limited data only)

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Lead from '@/models/Lead';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ referenceId: string }> }
) {
  try {
    const { referenceId } = await params;

    if (!referenceId || !/^CYN-\d{4}-[A-Z0-9]{7}$/.test(referenceId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid reference ID format' },
        { status: 400 }
      );
    }

    await connectDB();

    const lead = await Lead.findOne({ referenceId }).select(
      'referenceId projectGoal recommendedService status priorityLevel createdAt'
    );

    if (!lead) {
      return NextResponse.json(
        { success: false, error: 'Enquiry not found. Please check your reference ID.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        referenceId: lead.referenceId,
        projectGoal: lead.projectGoal,
        recommendedService: lead.recommendedService,
        status: lead.status,
        submittedAt: lead.createdAt,
      },
    });
  } catch (err) {
    console.error('[GET /api/leads/track]', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

