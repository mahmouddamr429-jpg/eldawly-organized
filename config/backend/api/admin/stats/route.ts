import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';

export async function GET() {
  try {
    const [orders, products] = await Promise.all([db.order.findMany(), db.product.findMany()]);
    const totalRevenue = orders.reduce((s: number, o: any) => s + o.total, 0);
    const totalOrders = orders.length;
    const productCount = products.length;
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    const sales: Record<string, any> = {};
    for (const o of orders) { try { for (const it of JSON.parse(o.items)) { const k = String(it.id); if (!sales[k]) sales[k] = { name: it.name, qty: 0, revenue: 0, category: '' }; sales[k].qty += it.qty; sales[k].revenue += it.price * it.qty; } } catch {} }
    const pMap = new Map(products.map((p: any) => [p.id, p]));
    for (const [id, s] of Object.entries(sales)) { const p = pMap.get(parseInt(id)); if (p) (s as any).category = (p as any).category; }

    const categorySales: Record<string, number> = {};
    for (const s of Object.values(sales)) { const c = (s as any).category; if (c) categorySales[c] = (categorySales[c] || 0) + (s as any).revenue; }

    const now = new Date();
    const dailyRevenue = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(now); d.setDate(d.getDate() - (6 - i)); const ds = d.toISOString().split('T')[0];
      const day = orders.filter((o: any) => new Date(o.createdAt).toISOString().split('T')[0] === ds);
      return { date: ds, revenue: day.reduce((s: number, o: any) => s + o.total, 0), orders: day.length };
    });

    const recentOrders = await db.order.findMany({ orderBy: { createdAt: 'desc' }, take: 20 });
    const lowStock = await db.product.findMany({ where: { stock: { lte: 10 } }, orderBy: { stock: 'asc' }, take: 20 });

    return NextResponse.json({ totalRevenue, totalOrders, productCount, avgOrderValue, topProducts: Object.entries(sales).sort(([, a]: any, [, b]: any) => b.qty - a.qty).slice(0, 10).map(([id, s]: any) => ({ id, ...s })), categorySales, lowStock, dailyRevenue, recentOrders });
  } catch { return NextResponse.json({ error: 'خطأ في السيرفر' }, { status: 500 }); }
}
