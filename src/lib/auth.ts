// src/lib/auth.ts
// JWT authentication utilities using jose (Edge-compatible)

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'cynbit_admin_token';

function getSecretKey() {
  const secret = process.env.JWT_SECRET || 'cynbit_default_fallback_secret_for_build_only_32_characters';
  return new TextEncoder().encode(secret);
}

export interface AdminPayload {
  adminId: string;
  email: string;
  name: string;
  role: string;
}

export async function signJWT(payload: AdminPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(getSecretKey());
}

export async function verifyJWT(token: string): Promise<AdminPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload as unknown as AdminPayload;
  } catch {
    return null;
  }
}

export async function getAuthPayload(): Promise<AdminPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyJWT(token);
}

export function getCookieName(): string {
  return COOKIE_NAME;
}

export function getAuthCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  };
}
