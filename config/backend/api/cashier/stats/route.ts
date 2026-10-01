import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { AuthenticationError, getAuthenticatedUser, requireRole } from '../../../lib/auth';

export async function GET(req: NextRequest) {
  try {
    requireRole(await getAuthenticatedUser(req), ['admin', 'cashier']);
    const [pending, completed] = await Promise.all([
      db.order.findMany({ where: { orderType: 'dine-in', status: 'pending' }, orderBy: { createdAt: 'desc' } }),
      db.order.findMany({ where: { orderType: 'dine-in', status: 'completed' }, orderBy: { createdAt: 'desc' }, take: 50 }),
    ]);
    return NextResponse.json({ pendingCount: pending.length, completedCount: completed.length, pending, completed });
  } catch (error) {
    if (error instanceof AuthenticationError) return NextResponse.json({ error: error.message }, { status: error.status });
    return NextResponse.json({ error: 'خطأ في السيرفر' }, { status: 500 });
  }
}
