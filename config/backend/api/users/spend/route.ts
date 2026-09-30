import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';

export async function POST(req: NextRequest) {
  try {
    const { userId, amount } = await req.json();
    if (!userId || !amount || amount <= 0) return NextResponse.json({ success: false, error: 'بيانات ناقصة' }, { status: 400 });

    // Handle both number and string userId
    const numericId = typeof userId === 'string' ? parseInt(userId) : userId;
    if (isNaN(numericId)) return NextResponse.json({ success: false, error: 'معرف المستخدم غير صالح' }, { status: 400 });

    const user = await db.user.findUnique({ where: { id: numericId } });
    if (!user) return NextResponse.json({ success: false, error: 'المستخدم مش موجود' }, { status: 404 });

    const newTotal = user.totalSpent + parseFloat(String(amount));
    const loyaltyGift = newTotal >= 500;
    const justEarnedGift = loyaltyGift && !user.loyaltyGift;
    await db.user.update({ where: { id: user.id }, data: { totalSpent: newTotal, loyaltyGift } });
    return NextResponse.json({ success: true, totalSpent: newTotal, loyaltyGift, justEarnedGift });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: 'خطأ في السيرفر' }, { status: 500 });
  }
}
