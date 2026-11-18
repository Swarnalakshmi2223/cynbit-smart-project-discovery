// src/app/api/admin/leads/[id]/route.ts
// GET /api/admin/leads/[id] — Get lead detail
// PATCH /api/admin/leads/[id] — Update lead status

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Lead from '@/models/Lead';
import { getAuthPayload } from '@/lib/auth';
import { statusUpdateSchema } from '@/lib/validation';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const payload = await getAuthPayload();
    if (!payload) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    const lead = await Lead.findById(id).select('-__v');
    if (!lead) {
      return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: lead });
  } catch (err) {
    console.error('[GET /api/admin/leads/[id]]', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const payload = await getAuthPayload();
    if (!payload) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    const result = statusUpdateSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid status value', details: result.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    await connectDB();

    const lead = await Lead.findByIdAndUpdate(
      id,
      { status: result.data.status },
      { new: true, runValidators: true }
    ).select('-__v');

    if (!lead) {
      return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Lead status updated successfully',
      data: lead,
    });
  } catch (err) {
    console.error('[PATCH /api/admin/leads/[id]]', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

