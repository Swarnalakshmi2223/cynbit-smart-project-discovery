// src/app/api/auth/login/route.ts
// POST /api/auth/login — Admin authentication

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Admin from '@/models/Admin';
import { adminLoginSchema } from '@/lib/validation';
import { signJWT, getCookieName, getAuthCookieOptions } from '@/lib/auth';

// Simple login rate limiting
const loginRateMap = new Map<string, { attempts: number; resetAt: number }>();

function checkLoginRateLimit(ip: string): boolean {
  const now = Date.now();
  const existing = loginRateMap.get(ip);
  if (!existing || now > existing.resetAt) {
    loginRateMap.set(ip, { attempts: 1, resetAt: now + 900_000 }); // 15 min window
    return true;
  }
  if (existing.attempts >= 10) return false;
  existing.attempts++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
    if (!checkLoginRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many login attempts. Please try again in 15 minutes.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const result = adminLoginSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid request', details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { email, password } = result.data;
    await connectDB();

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      // Don't reveal whether email exists
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const passwordMatch = await admin.comparePassword(password);
    if (!passwordMatch) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const token = await signJWT({
      adminId: admin._id.toString(),
      email: admin.email,
      name: admin.name,
      role: admin.role,
    });

    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      data: { name: admin.name, email: admin.email, role: admin.role },
    });

    response.cookies.set(getCookieName(), token, getAuthCookieOptions());

    return response;
  } catch (err) {
    console.error('[POST /api/auth/login]', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

