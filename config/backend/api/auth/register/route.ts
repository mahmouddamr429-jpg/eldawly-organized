import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { signToken } from '../../../lib/jwt';

const pub = (u: any) => ({ id: u.id, username: u.username, role: u.role, displayName: u.displayName, email: u.email, phone: u.phone, totalSpent: u.totalSpent, loyaltyGift: u.loyaltyGift });

export async function POST(req: NextRequest) {
  try {
    const { displayName, email, phone, password } = await req.json();
    if (!displayName?.trim() || displayName.trim().length < 2) return NextResponse.json({ success: false, error: 'الاسم لازم 2 حروف' }, { status: 400 });
    if (!email?.trim()) return NextResponse.json({ success: false, error: 'البريد الإلكتروني مطلوب' }, { status: 400 });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return NextResponse.json({ success: false, error: 'البريد الإلكتروني مش صحيح' }, { status: 400 });
    if (!phone?.trim()) return NextResponse.json({ success: false, error: 'رقم الموبايل مطلوب' }, { status: 400 });
    if (!/^01[0-9]{9}$/.test(phone.trim())) return NextResponse.json({ success: false, error: 'رقم الموبايل لازم يبدأ بـ 01 و يكون 11 رقم' }, { status: 400 });
    if (!password?.trim() || password.trim().length < 4) return NextResponse.json({ success: false, error: 'كلمة السر مطلوبة — 4 حروف على الأقل' }, { status: 400 });
    const username = displayName.replace(/[^\u0600-\u06FFa-zA-Z\s]/g, '').trim().replace(/\s+/g, '_').toLowerCase();
    if (username.length < 3) return NextResponse.json({ success: false, error: 'الاسم مش صالح' }, { status: 400 });
    if (await db.user.findUnique({ where: { username } })) return NextResponse.json({ success: false, error: 'الحساب ده موجود' }, { status: 409 });
    // Check if email already exists
    const existingEmail = await db.user.findFirst({ where: { email: email.trim() } });
    if (existingEmail) return NextResponse.json({ success: false, error: 'البريد الإلكتروني ده مسجل قبل كده' }, { status: 409 });
    const user = await db.user.create({ data: { username, password, displayName, email: email.trim(), phone: phone.trim(), role: 'customer' } });
    return NextResponse.json({ success: true, user: pub(user), token: signToken({ userId: user.id, role: user.role }) }, { status: 201 });
  } catch { return NextResponse.json({ success: false, error: 'خطأ في السيرفر' }, { status: 500 }); }
}
