import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../lib/db';
import { verifyToken } from '../../lib/jwt';

function isAdmin(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (!token) return false;

  try {
    return verifyToken(token).role === 'admin';
  } catch {
    return false;
  }
}

function normalizeProduct(data: any) {
  const name = typeof data.name === 'string' ? data.name.trim() : '';
  const category = typeof data.category === 'string' ? data.category.trim() : '';
  const price = Number(data.price);
  const stock = Number(data.stock);
  const rating = Number(data.rating ?? 4.5);

  if (!name || !category || !Number.isFinite(price) || price <= 0 || !Number.isInteger(stock) || stock < 0) {
    return null;
  }

  return {
    name,
    category,
    price,
    stock,
    description: typeof data.description === 'string' ? data.description.trim() : '',
    image: typeof data.image === 'string' ? data.image.trim() : '',
    featured: Boolean(data.featured),
    rating: Number.isFinite(rating) ? rating : 4.5,
  };
}

export async function GET(req: NextRequest) {
  try {
    const p = new URL(req.url).searchParams;
    const where: any = {};
    const cat = p.get('category'); if (cat && cat !== 'الكل') where.category = cat;
    const search = p.get('search'); if (search) where.OR = [{ name: { contains: search } }, { description: { contains: search } }];
    const feat = p.get('featured'); if (feat !== null) where.featured = feat === 'true';
    const sort = p.get('sort');
    const page = parseInt(p.get('page') || '1'), limit = parseInt(p.get('limit') || '50');
    const orderBy = sort ? [{ [sort.split('_')[0]]: sort.split('_')[1] }] : [{ featured: 'desc' }, { rating: 'desc' }];
    const [products, total] = await Promise.all([db.product.findMany({ where, orderBy, skip: (page - 1) * limit, take: limit }), db.product.count({ where })]);
    return NextResponse.json({ data: products, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } });
  } catch { return NextResponse.json({ error: 'خطأ في السيرفر' }, { status: 500 }); }
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ success: false, error: 'غير مصرح' }, { status: 403 });

  try {
    const data = normalizeProduct(await req.json());
    if (!data) return NextResponse.json({ success: false, error: 'تحقق من الاسم والقسم والسعر والمخزون' }, { status: 400 });

    const product = await db.product.create({ data });
    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: 'خطأ في السيرفر' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ success: false, error: 'غير مصرح' }, { status: 403 });

  try {
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
  } catch {
    return NextResponse.json({ success: false, error: 'خطأ في السيرفر' }, { status: 500 });
  }
}
