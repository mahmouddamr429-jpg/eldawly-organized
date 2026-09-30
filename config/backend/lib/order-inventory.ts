import { db } from './db';

export class InventoryValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InventoryValidationError';
  }
}

type InventoryGlobal = typeof globalThis & { __eldawlyInventoryQueue?: Promise<void> };
const inventoryGlobal = globalThis as InventoryGlobal;

async function serializeInventory<T>(operation: () => Promise<T>): Promise<T> {
  const previous = inventoryGlobal.__eldawlyInventoryQueue ?? Promise.resolve();
  let release!: () => void;
  inventoryGlobal.__eldawlyInventoryQueue = new Promise<void>(resolve => { release = resolve; });
  await previous;

  try {
    return await operation();
  } finally {
    release();
  }
}

export async function createOrderWithInventory<T>(
  rawItems: unknown,
  createOrder: (items: any[], subtotal: number) => Promise<T>,
): Promise<T> {
  return serializeInventory(async () => {
    if (!Array.isArray(rawItems) || rawItems.length === 0) {
      throw new InventoryValidationError('السلة فارغة');
    }

    const quantities = new Map<number, number>();
    for (const item of rawItems) {
      if (!item || typeof item !== 'object') throw new InventoryValidationError('بيانات منتج غير صالحة');
      const id = Number(item.id);
      const quantity = Number(item.qty);
      if (!Number.isInteger(id) || !Number.isInteger(quantity) || quantity < 1) {
        throw new InventoryValidationError('بيانات منتج غير صالحة');
      }
      quantities.set(id, (quantities.get(id) ?? 0) + quantity);
    }

    const products = new Map<number, any>();
    for (const [id, quantity] of quantities) {
      const product = await db.product.findUnique({ where: { id } });
      if (!product) throw new InventoryValidationError('المنتج غير موجود في المخزون');
      if (product.stock < quantity) {
        throw new InventoryValidationError(`الكمية المطلوبة من "${product.name}" غير متاحة. المتاح: ${product.stock}`);
      }
      products.set(id, product);
    }

    const verifiedItems = rawItems.map((item: any) => {
      const product = products.get(Number(item.id));
      return { ...item, id: product.id, name: product.name, price: product.price, qty: Number(item.qty) };
    });
    const subtotal = verifiedItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    const changedProducts: any[] = [];

    try {
      for (const [id, quantity] of quantities) {
        const product = products.get(id);
        await db.product.update({ where: { id }, data: { stock: product.stock - quantity } });
        changedProducts.push(product);
      }

      return await createOrder(verifiedItems, subtotal);
    } catch (error) {
      for (const product of changedProducts.reverse()) {
        await db.product.update({ where: { id: product.id }, data: { stock: product.stock } });
      }
      throw error;
    }
  });
}