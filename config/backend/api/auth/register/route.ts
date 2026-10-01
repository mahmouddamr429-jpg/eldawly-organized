import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { signToken } from '../../../lib/jwt';
import { hashPassword } from '../../../lib/password';

const pub = (u: any) => ({ id: u.id, username: u.username, role: u.role, displayName: u.displayName, email: u.email, phone: u.phone, totalSpent: u.totalSpent, loyaltyGift: u.loyaltyGift });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body || typeof body !== 'object') return NextResponse.json({ success: false, error: 'بيانات التسجيل غير صالحة' }, { status: 400 });
    const displayName = typeof body.displayName === 'string' ? body.displayName.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
    const password = typeof body.password === 'string' ? body.password : '';
    if (displayName.length < 2 || displayName.length > 80) return NextResponse.json({ success: false, error: 'الاسم لازم يكون بين حرفين و80 حرفًا' }, { status: 400 });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return NextResponse.json({ success: false, error: 'البريد الإلكتروني مش صحيح' }, { status: 400 });
    if (!/^01[0-9]{9}$/.test(phone)) return NextResponse.json({ success: false, error: 'رقم الموبايل لازم يبدأ بـ 01 و يكون 11 رقم' }, { status: 400 });
    if (password.length < 8 || password.length > 128) return NextResponse.json({ success: false, error: 'كلمة السر لازم تكون بين 8 و128 حرفًا' }, { status: 400 });
    const nameUsername = displayName.replace(/[^\u0600-\u06FFa-zA-Z\s]/g, '').trim().replace(/\s+/g, '_').toLowerCase();
    const username = nameUsername.length < 3 ? `user_${nameUsername}` : nameUsername;
    if (username.length < 3) return NextResponse.json({ success: false, error: 'الاسم مش صالح' }, { status: 400 });
    if (await db.user.findUnique({ where: { username } })) return NextResponse.json({ success: false, error: 'الحساب ده موجود' }, { status: 409 });
    // Check if email already exists
    const existingEmail = await db.user.findFirst({ where: { email } });
    if (existingEmail) return NextResponse.json({ success: false, error: 'البريد الإلكتروني ده مسجل قبل كده' }, { status: 409 });
    const user = await db.user.create({ data: { username, password: hashPassword(password), displayName, email, phone, role: 'customer' } });
    return NextResponse.json({ success: true, user: pub(user), token: signToken({ userId: user.id, role: user.role }) }, { status: 201 });
  } catch { return NextResponse.json({ success: false, error: 'خطأ في السيرفر' }, { status: 500 }); }
}
