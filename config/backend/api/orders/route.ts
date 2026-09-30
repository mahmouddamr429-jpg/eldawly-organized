import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../lib/db';
import { createOrderWithInventory, InventoryValidationError } from '../../lib/order-inventory';
import { v4 as uuidv4 } from 'uuid';

export async function GET(req: NextRequest) {
  try {
    const p = new URL(req.url).searchParams;
    const where: any = {};
    const status = p.get('status'); if (status) where.status = status;
    const orderType = p.get('orderType'); if (orderType) where.orderType = orderType;
    const search = p.get('search'); if (search) where.OR = [{ customerName: { contains: search } }, { customerPhone: { contains: search } }, { id: { contains: search } }];
    const page = parseInt(p.get('page') || '1'), limit = parseInt(p.get('limit') || '50');
    const [orders, total] = await Promise.all([db.order.findMany({ where, orderBy: { createdAt: 'desc' }, skip: (page - 1) * limit, take: limit }), db.order.count({ where })]);
    return NextResponse.json({ data: orders, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } });
  } catch { return NextResponse.json({ error: 'خطأ في السيرفر' }, { status: 500 }); }
}

export async function POST(req: NextRequest) {
  try {
    const d = await req.json();
    const orderId = uuidv4().slice(0, 8).toUpperCase();
    const order = await createOrderWithInventory(d.items, async (verifiedItems, subtotal) => {
      const deliveryFee = subtotal >= 100 ? 0 : 15;
      const total = Math.round((subtotal + deliveryFee) * 100) / 100;
      return db.order.create({
        data: {
          id: orderId,
          customerName: d.customerName,
          customerEmail: d.customerEmail || '',
          customerPhone: d.customerPhone || '',
          address: d.address || '',
          items: JSON.stringify(verifiedItems),
          total,
          paid: 0,
          status: 'pending',
          orderType: 'delivery',
          notes: d.notes || '',
          userId: d.userId || null,
        }
      });
    });

    return NextResponse.json({ success: true, orderId, order, message: 'تم استلام طلبك بنجاح!' }, { status: 201 });
  } catch (e: any) {
    if (e instanceof InventoryValidationError) return NextResponse.json({ success: false, error: e.message }, { status: 400 });
    return NextResponse.json({ success: false, error: 'خطأ في السيرفر: ' + (e.message || '') }, { status: 500 });
  }
}
