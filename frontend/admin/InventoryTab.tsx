'use client';

import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { CheckCircle, PackagePlus, Pencil, Search, X } from 'lucide-react';
import { DataTable } from '../shared/ui';
import { productApi } from '../lib/api';
import InventorySummaryCards from './InventorySummaryCards';
import StockHealthBar from './StockHealthBar';
import LowStockTable from './LowStockTable';

interface Product {
  id: number;
  name: string;
  category: string;
  description?: string;
  image?: string;
  price: number;
  stock: number;
  featured?: boolean;
  rating?: number;
}

interface ProductForm {
  name: string;
  category: string;
  description: string;
  image: string;
  price: string;
  stock: string;
  featured: boolean;
}

interface InventoryTabProps {
  productCount: number;
  lowStock: Product[];
}

const emptyForm: ProductForm = {
  name: '',
  category: '',
  description: '',
  image: '',
  price: '',
  stock: '0',
  featured: false,
};

export default function InventoryTab({ productCount, lowStock }: InventoryTabProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [search, setSearch] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageUploadError, setImageUploadError] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const loadProducts = useCallback(async () => {
    const result = await productApi.getAll(500);
    const list = Array.isArray(result?.data) ? result.data : Array.isArray(result) ? result : [];
    setProducts(list);
    setProductsLoaded(true);
  }, []);

  useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  const displayProductCount = productsLoaded ? products.length : productCount;
  const inventoryLowStock = productsLoaded ? products.filter(product => product.stock <= 10) : lowStock;
  const outOfStock = inventoryLowStock.filter(product => product.stock === 0);
  const lowOnly = inventoryLowStock.filter(product => product.stock > 0);
  const available = displayProductCount - inventoryLowStock.length;
  const categories = Array.from(new Set(products.map(product => product.category).filter(Boolean)));
  const filteredProducts = products.filter(product =>
    `${product.name} ${product.category}`.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase()),
  );

  const openAddForm = () => {
    setEditingProduct(null);
    setForm(emptyForm);
    setImageUploadError('');
    setError('');
    setNotice('');
    setFormOpen(true);
  };

  const openEditForm = (product: Product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      category: product.category,
      description: product.description ?? '',
      image: product.image ?? '',
      price: String(product.price),
      stock: String(product.stock),
      featured: Boolean(product.featured),
    });
    setImageUploadError('');
    setError('');
    setNotice('');
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingProduct(null);
    setError('');
  };

  const uploadProductImage = async (file: File) => {
    setUploadingImage(true);
    setImageUploadError('');
    try {
      const result = await productApi.uploadImage(file);
      if (!result?.success || !result.image) {
        setImageUploadError(result?.error || 'تعذر رفع الصورة');
        return;
      }
      setForm(current => ({ ...current, image: result.image }));
    } catch {
      setImageUploadError('تعذر الاتصال بالخادم أثناء رفع الصورة');
    } finally {
      setUploadingImage(false);
    }
  };

  const saveProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    const savedProductName = form.name.trim();

    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      rating: editingProduct?.rating ?? 4.5,
    };

    try {
      const result = editingProduct
        ? await productApi.update(editingProduct.id, payload)
        : await productApi.create(payload);

      if (!result?.success) {
        setError(result?.error || 'تعذر حفظ المنتج');
        return;
      }

      await loadProducts();
  setSearch(savedProductName);
      setFormOpen(false);
      setEditingProduct(null);
      setForm(emptyForm);
      setNotice(editingProduct ? 'تم تحديث المنتج' : 'تمت إضافة المنتج');
    } catch {
      setError('تعذر الاتصال بالخادم');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <InventorySummaryCards productCount={displayProductCount} lowOnlyCount={lowOnly.length} outOfStockCount={outOfStock.length} availableCount={available} />
      <StockHealthBar productCount={displayProductCount} availableCount={available} lowOnlyCount={lowOnly.length} outOfStockCount={outOfStock.length} />

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-black text-[#2d2017]">إدارة المنتجات</h2>
            <p className="mt-1 text-sm text-[#888]">إضافة المنتجات وتحديث الأسعار والمخزون</p>
          </div>
          <button type="button" onClick={openAddForm}
            className="inline-flex items-center gap-2 rounded-lg bg-[#c8744a] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#a85a36]">
            <PackagePlus size={17} /> إضافة منتج
          </button>
        </div>

        {notice && <p role="status" className="flex items-center gap-2 text-sm font-bold text-green-700"><CheckCircle size={17} />{notice}</p>}

        <label className="flex max-w-md items-center gap-2 rounded-lg border border-[#e8ddd2] bg-white px-3 py-2.5 text-[#888]">
          <Search size={17} />
          <input value={search} onChange={event => setSearch(event.target.value)} placeholder="ابحث بالاسم أو القسم"
            className="w-full bg-transparent text-sm text-[#2d2017] outline-none" />
        </label>

        <div className="overflow-hidden rounded-lg border border-[#e8ddd2] bg-white">
          {!productsLoaded ? (
            <p className="p-8 text-center text-sm text-[#888]">جاري تحميل المنتجات...</p>
          ) : filteredProducts.length === 0 ? (
            <p className="p-6 text-center text-sm text-[#888]">لا توجد منتجات مطابقة</p>
          ) : (
            <DataTable headers={['المنتج', 'القسم', 'السعر', 'المخزون', 'إجراء']}
              rows={filteredProducts.map(product => [
                <span key="name" className="font-bold text-[#2d2017]">{product.name}</span>,
                <span key="category" className="text-[#777]">{product.category}</span>,
                <span key="price" className="font-bold text-[#c8744a]">{Number(product.price).toFixed(2)} ج</span>,
                <span key="stock" className={product.stock <= 10 ? 'font-bold text-amber-700' : 'font-medium'}>{product.stock}</span>,
                <button key="edit" type="button" onClick={() => openEditForm(product)} title={`تعديل ${product.name}`}
                  aria-label={`تعديل ${product.name}`} className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#e8ddd2] text-[#2d2017] hover:border-[#c8744a] hover:text-[#c8744a]">
                  <Pencil size={16} />
                </button>,
              ])} />
          )}
        </div>
      </section>

      <LowStockTable lowStock={inventoryLowStock} />

      {formOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 p-4" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) closeForm(); }}>
          <div role="dialog" aria-modal="true" aria-labelledby="product-dialog-title" className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-5 shadow-2xl sm:p-7">
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <h3 id="product-dialog-title" className="text-lg font-black text-[#2d2017]">{editingProduct ? 'تعديل المنتج' : 'إضافة منتج'}</h3>
                <p className="mt-1 text-sm text-[#888]">{editingProduct ? 'عدّل السعر أو بيانات المنتج ثم احفظ' : 'أدخل بيانات المنتج الجديد'}</p>
              </div>
              <button type="button" onClick={closeForm} aria-label="إغلاق" className="rounded-md p-2 text-[#777] hover:bg-[#f5e6de]"><X size={19} /></button>
            </div>
            <form onSubmit={saveProduct} className="space-y-4">
              <ProductFields form={form} setForm={setForm} categories={categories} uploadingImage={uploadingImage} imageUploadError={imageUploadError} onImageUpload={uploadProductImage} />
              {error && <p role="alert" className="text-sm font-bold text-red-600">{error}</p>}
              <FormActions saving={saving} uploadingImage={uploadingImage} editing={Boolean(editingProduct)} />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function ProductFields({ form, setForm, categories, uploadingImage, imageUploadError, onImageUpload }: {
  form: ProductForm;
  setForm: (next: (current: ProductForm) => ProductForm) => void;
  categories: string[];
  uploadingImage: boolean;
  imageUploadError: string;
  onImageUpload: (file: File) => Promise<void>;
}) {
  const update = (field: keyof ProductForm, value: string | boolean) => setForm(current => ({ ...current, [field]: value }));
  const isInlineImage = /^data:image\/(avif|jpeg|png|webp);base64,/i.test(form.image);
  const imagePreview = isInlineImage || /^(https?:\/\/|\/)/i.test(form.image) ? form.image : `/images/products/${form.image}`;

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1.5 text-sm font-bold text-[#2d2017]">
          اسم المنتج *
          <input required value={form.name} onChange={event => update('name', event.target.value)} className="w-full rounded-lg border border-[#e8ddd2] px-3 py-2.5 font-normal outline-none focus:border-[#c8744a]" />
        </label>
        <label className="space-y-1.5 text-sm font-bold text-[#2d2017]">
          القسم *
          <input required list="product-categories" value={form.category} onChange={event => update('category', event.target.value)} className="w-full rounded-lg border border-[#e8ddd2] px-3 py-2.5 font-normal outline-none focus:border-[#c8744a]" />
          <datalist id="product-categories">{categories.map(category => <option key={category} value={category} />)}</datalist>
        </label>
        <label className="space-y-1.5 text-sm font-bold text-[#2d2017]">
          السعر *
          <input required type="number" min="0.01" step="0.01" value={form.price} onChange={event => update('price', event.target.value)} className="w-full rounded-lg border border-[#e8ddd2] px-3 py-2.5 font-normal outline-none focus:border-[#c8744a]" />
        </label>
        <label className="space-y-1.5 text-sm font-bold text-[#2d2017]">
          الكمية بالمخزون *
          <input required type="number" min="0" step="1" value={form.stock} onChange={event => update('stock', event.target.value)} className="w-full rounded-lg border border-[#e8ddd2] px-3 py-2.5 font-normal outline-none focus:border-[#c8744a]" />
        </label>
      </div>
      <label className="block space-y-1.5 text-sm font-bold text-[#2d2017]">
        الوصف
        <textarea rows={3} value={form.description} onChange={event => update('description', event.target.value)} className="w-full resize-y rounded-lg border border-[#e8ddd2] px-3 py-2.5 font-normal outline-none focus:border-[#c8744a]" />
      </label>
      <div className="space-y-2">
        <label className="block space-y-1.5 text-sm font-bold text-[#2d2017]">
          صورة المنتج
          <input type="file" accept="image/jpeg,image/png,image/webp,image/avif"
            onChange={event => {
              const file = event.target.files?.[0];
              if (file) void onImageUpload(file);
              event.target.value = '';
            }}
            className="w-full rounded-lg border border-[#e8ddd2] bg-white px-3 py-2 text-sm font-normal file:ml-3 file:rounded-md file:border-0 file:bg-[#f5e6de] file:px-3 file:py-1.5 file:font-bold file:text-[#7c4227]" />
        </label>
        <p className="text-xs text-[#888]">JPG أو PNG أو WebP أو AVIF، بحد أقصى 5 ميجابايت.</p>
        {uploadingImage && <p role="status" className="text-sm font-bold text-[#c8744a]">جاري رفع الصورة...</p>}
        {imageUploadError && <p role="alert" className="text-sm font-bold text-red-600">{imageUploadError}</p>}
        {form.image && (
          <div className="flex items-center gap-3 rounded-lg border border-[#e8ddd2] bg-[#fdf9f5] p-2.5">
            <img src={imagePreview} alt="معاينة صورة المنتج" className="h-20 w-20 rounded-md border border-[#e8ddd2] bg-white object-cover" />
            <div className="min-w-0">
              <p className="text-xs font-bold text-[#2d2017]">الصورة الحالية</p>
              <p className="truncate text-xs text-[#888]" dir="ltr">{form.image}</p>
            </div>
          </div>
        )}
        <label className="block space-y-1.5 text-sm font-bold text-[#2d2017]">
          أو أدخل رابط الصورة / اسم ملف موجود
          <input value={form.image} onChange={event => update('image', event.target.value)} className="w-full rounded-lg border border-[#e8ddd2] px-3 py-2.5 font-normal outline-none focus:border-[#c8744a]" />
        </label>
      </div>
      <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-bold text-[#2d2017]">
        <input type="checkbox" checked={form.featured} onChange={event => update('featured', event.target.checked)} className="h-4 w-4 accent-[#c8744a]" />
        منتج مميز
      </label>
    </>
  );
}

function FormActions({ saving, uploadingImage, editing }: { saving: boolean; uploadingImage: boolean; editing: boolean }) {
  return (
    <div className="flex justify-end gap-2 border-t border-[#f0ece8] pt-4">
      <button type="submit" disabled={saving || uploadingImage} className="rounded-lg bg-[#c8744a] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#a85a36] disabled:opacity-60">
        {uploadingImage ? 'انتظر رفع الصورة...' : saving ? 'جاري الحفظ...' : editing ? 'حفظ التعديلات' : 'إضافة المنتج'}
      </button>
    </div>
  );
}
