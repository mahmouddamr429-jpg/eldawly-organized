import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';

export async function GET() {
  try {
    const [pending, completed] = await Promise.all([
      db.order.findMany({ where: { orderType: 'dine-in', status: 'pending' }, orderBy: { createdAt: 'desc' } }),
      db.order.findMany({ where: { orderType: 'dine-in', status: 'completed' }, orderBy: { createdAt: 'desc' }, take: 50 }),
    ]);
    return NextResponse.json({ pendingCount: pending.length, completedCount: completed.length, pending, completed });
  } catch { return NextResponse.json({ error: 'خطأ في السيرفر' }, { status: 500 }); }
}
