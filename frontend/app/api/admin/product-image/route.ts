import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { NextRequest, NextResponse } from 'next/server';
import { AuthenticationError, getAuthenticatedUser, requireRole } from '../../../../../config/backend/lib/auth';

export const runtime = 'nodejs';

const IMAGE_TYPES: Record<string, string> = {
  'image/avif': 'avif',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

export async function POST(req: NextRequest) {
  try {
    requireRole(await getAuthenticatedUser(req), ['admin']);
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return NextResponse.json({ success: false, error: error.message }, { status: error.status });
    }
    return NextResponse.json({ success: false, error: 'تعذر التحقق من الصلاحية' }, { status: 500 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ success: false, error: 'بيانات الصورة غير صالحة' }, { status: 400 });
  }
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
    const bytes = Buffer.from(await file.arrayBuffer());
    const isValidImage = extension === 'jpg'
      ? bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff
      : extension === 'png'
        ? bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
        : extension === 'webp'
          ? bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP'
          : bytes.toString('ascii', 4, 12).startsWith('ftypavif') || bytes.toString('ascii', 4, 12).startsWith('ftypavis');
    if (!isValidImage) return NextResponse.json({ success: false, error: 'محتوى الملف لا يطابق صيغة الصورة' }, { status: 415 });

    const filename = `product-${randomUUID()}.${extension}`;
    const directory = join(process.cwd(), 'public', 'images', 'products');
    await mkdir(directory, { recursive: true });
    await writeFile(join(directory, filename), bytes, { flag: 'wx' });
    return NextResponse.json({ success: true, image: filename, url: `/images/products/${filename}` }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: 'تعذر حفظ الصورة على الخادم' }, { status: 500 });
  }
}