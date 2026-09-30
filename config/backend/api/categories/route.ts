import { NextResponse } from 'next/server';
import { db } from '../../lib/db';
import { CAT_ORDER } from '../../lib/constants';

export async function GET() {
  try {
    const available = (await db.product.findMany({ select: { category: true }, distinct: ['category'] })).map(c => c.category);
    return NextResponse.json(['الكل', ...CAT_ORDER.filter(c => available.includes(c))]);
  } catch { return NextResponse.json({ error: 'خطأ في السيرفر' }, { status: 500 }); }
}
