import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { signToken } from '../../../lib/jwt';

const pub = (u: any) => ({ id: u.id, username: u.username, role: u.role, displayName: u.displayName, email: u.email, phone: u.phone, totalSpent: u.totalSpent, loyaltyGift: u.loyaltyGift });

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    const normalizedUsername = typeof username === 'string' ? username.trim() : '';
    if (normalizedUsername.length < 3) return NextResponse.json({ success: false, error: 'اسم المستخدم لازم 3 حروف' }, { status: 400 });
    if (!password || password.length < 4) return NextResponse.json({ success: false, error: 'كلمة السر مطلوبة' }, { status: 400 });
    const user = await db.user.findUnique({ where: { username: normalizedUsername } });
    if (!user || user.password !== password) return NextResponse.json({ success: false, error: 'اسم المستخدم أو كلمة السر غلط' }, { status: 401 });
    return NextResponse.json({ success: true, user: pub(user), token: signToken({ userId: user.id, role: user.role }) });
  } catch { return NextResponse.json({ success: false, error: 'خطأ في السيرفر' }, { status: 500 }); }
}
