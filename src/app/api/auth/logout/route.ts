// src/app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';
import { getCookieName } from '@/lib/auth';

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
  response.cookies.set(getCookieName(), '', { maxAge: 0, path: '/' });
  return response;
}

