import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { createOrderWithInventory, InventoryValidationError } from '../../../lib/order-inventory';
import { AuthenticationError, getAuthenticatedUser, requireRole } from '../../../lib/auth';
import { v4 as uuidv4 } from 'uuid';

export async function GET(req: NextRequest) {
  try {
    requireRole(await getAuthenticatedUser(req), ['admin', 'cashier']);
    const status = new URL(req.url).searchParams.get('status');
    const where: any = { orderType: 'dine-in' }; if (status) where.status = status;
    return NextResponse.json(await db.order.findMany({ where, orderBy: { createdAt: 'desc' } }));
  } catch (error) {
    if (error instanceof AuthenticationError) return NextResponse.json({ error: error.message }, { status: error.status });
    return NextResponse.json({ error: 'خطأ في السيرفر' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    requireRole(await getAuthenticatedUser(req), ['admin', 'cashier']);
    const d = await req.json();
    const customerName = typeof d?.customerName === 'string' ? d.customerName.trim() : '';
    const paid = Number(d?.paid ?? 0);
    if (customerName.length < 2 || customerName.length > 80 || !Number.isFinite(paid) || paid < 0) {
      return NextResponse.json({ success: false, error: 'تحقق من اسم العميل والمبلغ المدفوع' }, { status: 400 });
    }
    const orderId = uuidv4().toUpperCase();
    const order = await createOrderWithInventory(d.items, (verifiedItems, subtotal) => {
      if (paid > subtotal) throw new InventoryValidationError('المبلغ المدفوع لا يمكن أن يتجاوز إجمالي الطلب');
      return db.order.create({
        data: { id: orderId, customerName, items: JSON.stringify(verifiedItems), total: subtotal, paid, status: 'pending', orderType: 'dine-in', address: 'صالة' }
      });
    }));
    return NextResponse.json({ success: true, orderId, order }, { status: 201 });
  } catch (e: any) {
    if (e instanceof InventoryValidationError) return NextResponse.json({ success: false, error: e.message }, { status: 400 });
    if (e instanceof AuthenticationError) return NextResponse.json({ success: false, error: e.message }, { status: e.status });
    return NextResponse.json({ success: false, error: 'خطأ في السيرفر' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    requireRole(await getAuthenticatedUser(req), ['admin', 'cashier']);
    const { orderId, status } = await req.json();
    if (typeof orderId !== 'string' || !['completed', 'cancelled'].includes(status)) return NextResponse.json({ success: false, error: 'حالة الطلب غير صالحة' }, { status: 400 });
    const order = await db.order.findUnique({ where: { id: orderId } });
    if (!order) return NextResponse.json({ success: false, error: 'الطلب مش موجود' }, { status: 404 });
    if (order.status !== 'pending') return NextResponse.json({ success: false, error: 'لا يمكن تغيير حالة هذا الطلب' }, { status: 409 });
    return NextResponse.json({ success: true, order: await db.order.update({ where: { id: orderId }, data: { status } }) });
  } catch (error) {
    if (error instanceof AuthenticationError) return NextResponse.json({ success: false, error: error.message }, { status: error.status });
    return NextResponse.json({ success: false, error: 'خطأ في السيرفر' }, { status: 500 });
  }
}
