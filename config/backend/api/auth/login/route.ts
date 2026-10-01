import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { signToken } from '../../../lib/jwt';
import { hashPassword, verifyPassword } from '../../../lib/password';

const pub = (u: any) => ({ id: u.id, username: u.username, role: u.role, displayName: u.displayName, email: u.email, phone: u.phone, totalSpent: u.totalSpent, loyaltyGift: u.loyaltyGift });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const normalizedUsername = typeof body?.username === 'string' ? body.username.trim() : '';
    const password = typeof body?.password === 'string' ? body.password : '';
    if (normalizedUsername.length < 3) return NextResponse.json({ success: false, error: 'اسم المستخدم لازم 3 حروف' }, { status: 400 });
    if (password.length < 1 || password.length > 128) return NextResponse.json({ success: false, error: 'كلمة السر مطلوبة' }, { status: 400 });
    const user = await db.user.findUnique({ where: { username: normalizedUsername } });
    const isHashed = typeof user?.password === 'string' && user.password.startsWith('scrypt$');
    const validPassword = user && (isHashed ? verifyPassword(password, user.password) : user.password === password);
    if (!user || !validPassword) return NextResponse.json({ success: false, error: 'اسم المستخدم أو كلمة السر غلط' }, { status: 401 });
    if (!isHashed) await db.user.update({ where: { id: user.id }, data: { password: hashPassword(password) } });
    return NextResponse.json({ success: true, user: pub(user), token: signToken({ userId: user.id, role: user.role }) });
  } catch { return NextResponse.json({ success: false, error: 'خطأ في السيرفر' }, { status: 500 }); }
}
