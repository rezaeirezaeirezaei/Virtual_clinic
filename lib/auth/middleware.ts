import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT, JWTPayload } from './session';
import { UserRole } from '@prisma/client';

export interface AuthenticatedRequest extends NextRequest {
  user?: JWTPayload;
}

export function requireAuth(req: NextRequest): { user: JWTPayload } | NextResponse {
  const token = extractToken(req);

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = verifyJWT(token);
  if (!user) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  return { user };
}

export function requireRole(...roles: UserRole[]) {
  return (user: JWTPayload): boolean | NextResponse => {
    if (!roles.includes(user.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    return true;
  };
}

function extractToken(req: NextRequest): string | null {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // Try cookie
    const token = req.cookies.get('auth_token')?.value;
    return token || null;
  }
  return authHeader.substring(7);
}

export function setCookie(response: NextResponse, token: string): NextResponse {
  response.cookies.set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60, // 24 hours
    path: '/',
  });
  return response;
}
