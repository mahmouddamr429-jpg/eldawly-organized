import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../lib/db';
import { AuthenticationError, getAuthenticatedUser, requireRole } from '../../lib/auth';

function normalizeProduct(data: any) {
  const name = typeof data.name === 'string' ? data.name.trim() : '';
  const category = typeof data.category === 'string' ? data.category.trim() : '';
  const price = Number(data.price);
  const stock = Number(data.stock);
  const rating = Number(data.rating ?? 4.5);

  if (!name || !category || !Number.isFinite(price) || price <= 0 || !Number.isInteger(stock) || stock < 0) {
    return null;
  }
  if (price > 1_000_000 || stock > 1_000_000 || !Number.isFinite(rating) || rating < 0 || rating > 5) return null;
  if (typeof data.featured !== 'boolean' && data.featured !== undefined) return null;
  if (typeof data.description === 'string' && data.description.length > 2_000) return null;
  if (typeof data.image === 'string' && data.image.length > 500) return null;

  return {
    name,
    category,
    price,
    stock,
    description: typeof data.description === 'string' ? data.description.trim() : '',
    image: typeof data.image === 'string' ? data.image.trim() : '',
    featured: Boolean(data.featured),
    rating,
  };
}

export async function GET(req: NextRequest) {
  try {
    const p = new URL(req.url).searchParams;
    const page = Number(p.get('page') ?? 1);
    const limit = Number(p.get('limit') ?? 50);
    if (!Number.isInteger(page) || page < 1 || !Number.isInteger(limit) || limit < 1 || limit > 500) {
      return NextResponse.json({ error: 'بيانات الصفحات غير صالحة' }, { status: 400 });
    }

    const where: any = {};
    const cat = p.get('category'); if (cat && cat !== 'الكل') where.category = cat;
    const search = p.get('search');
    if (search && search.length > 100) return NextResponse.json({ error: 'عبارة البحث طويلة جدًا' }, { status: 400 });
    if (search) where.OR = [{ name: { contains: search } }, { description: { contains: search } }];
    const feat = p.get('featured'); if (feat !== null) where.featured = feat === 'true';
    const sort = p.get('sort');
    const sortFields = ['id', 'name', 'price', 'rating', 'stock', 'featured'];
    const sortParts = sort?.split('_') ?? [];
    const orderBy = sort
      ? sortParts.length === 2 && sortFields.includes(sortParts[0]) && ['asc', 'desc'].includes(sortParts[1])
        ? [{ [sortParts[0]]: sortParts[1] }]
        : null
      : [{ featured: 'desc' }, { rating: 'desc' }];
    if (!orderBy) return NextResponse.json({ error: 'ترتيب المنتجات غير صالح' }, { status: 400 });
    const [products, total] = await Promise.all([db.product.findMany({ where, orderBy, skip: (page - 1) * limit, take: limit }), db.product.count({ where })]);
    return NextResponse.json({ data: products, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } });
  } catch { return NextResponse.json({ error: 'خطأ في السيرفر' }, { status: 500 }); }
}

export async function POST(req: NextRequest) {
  try {
    requireRole(await getAuthenticatedUser(req), ['admin']);
    const data = normalizeProduct(await req.json());
    if (!data) return NextResponse.json({ success: false, error: 'تحقق من الاسم والقسم والسعر والمخزون' }, { status: 400 });

    const product = await db.product.create({ data });
    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error) {
    if (error instanceof AuthenticationError) return NextResponse.json({ success: false, error: error.message }, { status: error.status });
    return NextResponse.json({ success: false, error: 'خطأ في السيرفر' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    requireRole(await getAuthenticatedUser(req), ['admin']);
    const body = await req.json();
    const id = Number(body.id);
    const data = normalizeProduct(body);
    if (!Number.isInteger(id) || id < 1 || !data) {
      return NextResponse.json({ success: false, error: 'تحقق من بيانات المنتج' }, { status: 400 });
    }

    const existingProduct = await db.product.findUnique({ where: { id } });
    if (!existingProduct) return NextResponse.json({ success: false, error: 'المنتج غير موجود' }, { status: 404 });

    const product = await db.product.update({ where: { id }, data });
    return NextResponse.json({ success: true, product });
  } catch (error) {
    if (error instanceof AuthenticationError) return NextResponse.json({ success: false, error: error.message }, { status: error.status });
    return NextResponse.json({ success: false, error: 'خطأ في السيرفر' }, { status: 500 });
  }
}
