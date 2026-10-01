import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';

export async function POST(req: NextRequest) {
  try {
    const user = requireRole(await getAuthenticatedUser(req), ['customer']);
    const { orderId } = await req.json();
    if (typeof orderId !== 'string' || !orderId) return NextResponse.json({ success: false, error: 'رقم الطلب غير صالح' }, { status: 400 });
    const order = await db.order.findUnique({ where: { id: orderId } });
    if (!order || order.userId !== user.id || order.orderType !== 'delivery') {
      return NextResponse.json({ success: false, error: 'الطلب غير موجود لهذا الحساب' }, { status: 404 });
    }
    if (order.spendCredited) {
      return NextResponse.json({ success: true, totalSpent: user.totalSpent, loyaltyGift: user.loyaltyGift, justEarnedGift: false });
    }

    const newTotal = user.totalSpent + order.total;
    const loyaltyGift = newTotal >= 500;
    const justEarnedGift = loyaltyGift && !user.loyaltyGift;
    await db.user.update({ where: { id: user.id }, data: { totalSpent: newTotal, loyaltyGift } });
    await db.order.update({ where: { id: order.id }, data: { spendCredited: true } });
    return NextResponse.json({ success: true, totalSpent: newTotal, loyaltyGift, justEarnedGift });
  } catch (error) {
    if (error instanceof AuthenticationError) return NextResponse.json({ success: false, error: error.message }, { status: error.status });
    return NextResponse.json({ success: false, error: 'خطأ في السيرفر' }, { status: 500 });
  }
}
