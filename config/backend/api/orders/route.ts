import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../lib/db';
import { createOrderWithInventory, InventoryValidationError } from '../../lib/order-inventory';
import { AuthenticationError, getAuthenticatedUser, requireRole } from '../../lib/auth';
import { v4 as uuidv4 } from 'uuid';

export async function GET(req: NextRequest) {
  try {
    const p = new URL(req.url).searchParams;
    const search = p.get('search')?.trim();
    if (!search) {
      requireRole(await getAuthenticatedUser(req), ['admin', 'cashier']);
      const [orders, total] = await Promise.all([
        db.order.findMany({ orderBy: { createdAt: 'desc' }, skip: 0, take: 100 }),
        db.order.count(),
      ]);
      return NextResponse.json({ data: orders, pagination: { page: 1, limit: 100, total, totalPages: Math.ceil(total / 100) } });
    }
    if (search.length < 4 || search.length > 64) {
      return NextResponse.json({ error: 'ابحث برقم الطلب أو رقم موبايل صحيح' }, { status: 400 });
    }

    const where: any = {};
    const status = p.get('status'); if (status) where.status = status;
    const orderType = p.get('orderType'); if (orderType) where.orderType = orderType;
    if (/^01[0-9]{9}$/.test(search)) where.customerPhone = search;
    else where.id = search.toUpperCase();
    const page = 1, limit = 20;
    const [orders, total] = await Promise.all([db.order.findMany({ where, orderBy: { createdAt: 'desc' }, skip: (page - 1) * limit, take: limit }), db.order.count({ where })]);
    const publicOrders = orders.map((order: any) => ({
      id: order.id,
      customerName: order.customerName,
      items: order.items,
      total: order.total,
      status: order.status,
      createdAt: order.createdAt,
    }));
    return NextResponse.json({ data: publicOrders, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } });
  } catch (error) {
    if (error instanceof AuthenticationError) return NextResponse.json({ error: error.message }, { status: error.status });
    return NextResponse.json({ error: 'خطأ في السيرفر' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const d = await req.json();
    if (!d || typeof d !== 'object') return NextResponse.json({ success: false, error: 'بيانات الطلب غير صالحة' }, { status: 400 });
    const customerName = typeof d.customerName === 'string' ? d.customerName.trim() : '';
    const customerEmail = typeof d.customerEmail === 'string' ? d.customerEmail.trim().toLowerCase() : '';
    const customerPhone = typeof d.customerPhone === 'string' ? d.customerPhone.trim() : '';
    const address = typeof d.address === 'string' ? d.address.trim() : '';
    const notes = typeof d.notes === 'string' ? d.notes.trim() : '';
    if (customerName.length < 2 || customerName.length > 80 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail) ||
      customerEmail.length > 254 || !/^01[0-9]{9}$/.test(customerPhone) || address.length < 3 || address.length > 500 || notes.length > 500) {
      return NextResponse.json({ success: false, error: 'راجع بيانات الاسم والبريد والموبايل والعنوان' }, { status: 400 });
    }

    const authenticatedUser = await getAuthenticatedUser(req);
    if (authenticatedUser && authenticatedUser.role !== 'customer') {
      return NextResponse.json({ success: false, error: 'هذا الحساب غير مسموح له بطلب التوصيل' }, { status: 403 });
    }
    const orderId = uuidv4().toUpperCase();
    const order = await createOrderWithInventory(d.items, async (verifiedItems, subtotal) => {
      const deliveryFee = subtotal >= 100 ? 0 : 15;
      const total = Math.round((subtotal + deliveryFee) * 100) / 100;
      return db.order.create({
        data: {
          id: orderId,
          customerName,
          customerEmail,
          customerPhone,
          address,
          items: JSON.stringify(verifiedItems),
          total,
          paid: 0,
          status: 'pending',
          orderType: 'delivery',
          notes,
          userId: authenticatedUser?.id ?? null,
          spendCredited: false,
        }
      });
    });

    return NextResponse.json({ success: true, orderId, order, message: 'تم استلام طلبك بنجاح!' }, { status: 201 });
  } catch (e: any) {
    if (e instanceof InventoryValidationError) return NextResponse.json({ success: false, error: e.message }, { status: 400 });
    if (e instanceof AuthenticationError) return NextResponse.json({ success: false, error: e.message }, { status: e.status });
    return NextResponse.json({ success: false, error: 'خطأ في السيرفر' }, { status: 500 });
  }
}
