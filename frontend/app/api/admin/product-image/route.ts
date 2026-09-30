import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '../../../../../config/backend/lib/jwt';

export const runtime = 'nodejs';

const IMAGE_TYPES: Record<string, string> = {
  'image/avif': 'avif',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

export async function POST(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (!token) return NextResponse.json({ success: false, error: 'غير مصرح' }, { status: 403 });

  try {
    if (verifyToken(token).role !== 'admin') {
      return NextResponse.json({ success: false, error: 'غير مصرح' }, { status: 403 });
    }
  } catch {
    return NextResponse.json({ success: false, error: 'جلسة المدير غير صالحة' }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ success: false, error: 'اختار صورة أولًا' }, { status: 400 });
  }

  const extension = IMAGE_TYPES[file.type];
  if (!extension) {
    return NextResponse.json({ success: false, error: 'الصيغ المدعومة: JPG وPNG وWebP وAVIF' }, { status: 415 });
  }
  if (file.size === 0 || file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ success: false, error: 'حجم الصورة يجب ألا يتجاوز 5 ميجابايت' }, { status: 413 });
  }

  try {
    const filename = `product-${randomUUID()}.${extension}`;
    const directory = join(process.cwd(), 'public', 'images', 'products');
    await mkdir(directory, { recursive: true });
    await writeFile(join(directory, filename), Buffer.from(await file.arrayBuffer()), { flag: 'wx' });
    return NextResponse.json({ success: true, image: filename, url: `/images/products/${filename}` }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: 'تعذر حفظ الصورة على الخادم' }, { status: 500 });
  }
}