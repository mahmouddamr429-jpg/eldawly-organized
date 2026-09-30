import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { createOrderWithInventory, InventoryValidationError } from '../../../lib/order-inventory';
import { v4 as uuidv4 } from 'uuid';

export async function GET(req: NextRequest) {
  try {
    const status = new URL(req.url).searchParams.get('status');
    const where: any = { orderType: 'dine-in' }; if (status) where.status = status;
    return NextResponse.json(await db.order.findMany({ where, orderBy: { createdAt: 'desc' } }));
  } catch { return NextResponse.json({ error: 'خطأ في السيرفر' }, { status: 500 }); }
}

export async function POST(req: NextRequest) {
  try {
    const d = await req.json();
    const orderId = uuidv4().slice(0, 8).toUpperCase();
    const order = await createOrderWithInventory(d.items, (verifiedItems, subtotal) => db.order.create({
      data: { id: orderId, customerName: d.customerName, items: JSON.stringify(verifiedItems), total: subtotal, paid: d.paid || 0, status: 'pending', orderType: 'dine-in', address: 'صالة' }
    }));
    return NextResponse.json({ success: true, orderId, order }, { status: 201 });
  } catch (e: any) {
    if (e instanceof InventoryValidationError) return NextResponse.json({ success: false, error: e.message }, { status: 400 });
    return NextResponse.json({ success: false, error: 'خطأ في السيرفر' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { orderId, status } = await req.json();
    if (!orderId || !status) return NextResponse.json({ success: false, error: 'بيانات ناقصة' }, { status: 400 });
    const order = await db.order.findUnique({ where: { id: orderId } });
    if (!order) return NextResponse.json({ success: false, error: 'الطلب مش موجود' }, { status: 404 });
    return NextResponse.json({ success: true, order: await db.order.update({ where: { id: orderId }, data: { status } }) });
  } catch { return NextResponse.json({ success: false, error: 'خطأ في السيرفر' }, { status: 500 }); }
}
