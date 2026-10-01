import type { NextRequest } from 'next/server';
import { db } from './db';
import { verifyToken } from './jwt';

export class AuthenticationError extends Error {
  status: number;

  constructor(message: string, status = 401) {
    super(message);
    this.name = 'AuthenticationError';
    this.status = status;
  }
}

export async function getAuthenticatedUser(req: NextRequest) {
  const authorization = req.headers.get('authorization');
  if (!authorization) return null;

  const match = authorization.match(/^Bearer\s+(.+)$/i);
  if (!match) throw new AuthenticationError('جلسة الدخول غير صالحة');

  try {
    const payload = verifyToken(match[1]);
    const user = await db.user.findUnique({ where: { id: payload.userId } });
    if (!user) throw new AuthenticationError('الحساب غير موجود');
    return user;
  } catch (error) {
    if (error instanceof AuthenticationError) throw error;
    throw new AuthenticationError('جلسة الدخول غير صالحة');
  }
}

export function requireRole(user: any, roles: string[]) {
  if (!user) throw new AuthenticationError('سجل الدخول أولًا', 401);
  if (!roles.includes(user.role)) throw new AuthenticationError('غير مصرح', 403);
  return user;
}
