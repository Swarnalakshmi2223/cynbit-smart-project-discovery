// src/app/api/auth/me/route.ts
import { NextResponse } from 'next/server';
import { getAuthPayload } from '@/lib/auth';

export async function GET() {
  try {
    const payload = await getAuthPayload();
    if (!payload) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({
      success: true,
      data: { name: payload.name, email: payload.email, role: payload.role },
    });
  } catch (err) {
    console.error('[GET /api/auth/me]', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

