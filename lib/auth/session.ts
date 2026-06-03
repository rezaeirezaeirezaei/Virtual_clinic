import jwt from 'jsonwebtoken';
import { UserRole } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '24h';

export interface JWTPayload {
  userId: string;
  phone: string;
  role: UserRole;
  iat: number;
  exp: number;
}

export function generateJWT(userId: string, phone: string, role: UserRole): string {
  return jwt.sign(
    {
      userId,
      phone,
      role,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRE,
    }
  );
}

export function verifyJWT(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

export function extractTokenFromHeader(authHeader: string | undefined): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
}
