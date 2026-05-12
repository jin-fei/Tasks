import { Product, CartState, SKU } from "./types";

const mockProduct: Product = {
  id: "prod_001",
  name: "Classic Cotton T-Shirt",
  description:
    "A comfortable and versatile cotton t-shirt perfect for everyday wear. Made from 100% organic cotton, this shirt features a classic fit with a crew neck design. Available in multiple colors to match any style.",
  basePrice: 29.99,
  images: [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=600&fit=crop",
  ],
  variants: [
    { name: "Color", values: ["White", "Black", "Navy"] },
    { name: "Size", values: ["S", "M", "L", "XL"] },
  ],
  skus: [
    { id: "sku_001", variantName: "White / S", price: 29.99, stock: 10 },
    { id: "sku_002", variantName: "White / M", price: 29.99, stock: 15 },
    { id: "sku_003", variantName: "White / L", price: 29.99, stock: 8 },
    { id: "sku_004", variantName: "White / XL", price: 29.99, stock: 5 },
    { id: "sku_005", variantName: "Black / S", price: 29.99, stock: 12 },
    { id: "sku_006", variantName: "Black / M", price: 29.99, stock: 20 },
    { id: "sku_007", variantName: "Black / L", price: 29.99, stock: 18 },
    { id: "sku_008", variantName: "Black / XL", price: 29.99, stock: 10 },
    { id: "sku_009", variantName: "Navy / S", price: 32.99, stock: 0 },
    { id: "sku_010", variantName: "Navy / M", price: 32.99, stock: 7 },
    { id: "sku_011", variantName: "Navy / L", price: 32.99, stock: 5 },
    { id: "sku_012", variantName: "Navy / XL", price: 32.99, stock: 3 },
  ],
};

// In-memory cart state (in real app, this would be in context/store)
const cartState: CartState = {
  items: [],
  totalCount: 0,
};

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchProduct(): Promise<Product> {
  // Simulate loading state
  await delay(800);
  return mockProduct;
}

export async function addToCart(
  productId: string,
  skuId: string,
  quantity: number
): Promise<{ success: boolean; cartState: CartState }> {
  await delay(500);

  // Find the SKU to check stock
  const product = mockProduct;
  const sku = product.skus.find((s) => s.id === skuId);

  if (!sku) {
    throw new Error("SKU not found");
  }

  if (sku.stock < quantity) {
    throw new Error("Insufficient stock");
  }

  // Update cart state
  const existingItemIndex = cartState.items.findIndex(
    (item) => item.productId === productId && item.skuId === skuId
  );

  if (existingItemIndex >= 0) {
    cartState.items[existingItemIndex].quantity += quantity;
  } else {
    cartState.items.push({ productId, skuId, quantity });
  }

  // Recalculate total count
  cartState.totalCount = cartState.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Reduce mock stock (for demo purposes)
  sku.stock -= quantity;

  return { success: true, cartState: { ...cartState } };
}

export function getCurrentSku(
  product: Product,
  selectedColor: string,
  selectedSize: string
): SKU | undefined {
  const variantName = `${selectedColor} / ${selectedSize}`;
  return product.skus.find((sku) => sku.variantName === variantName);
}

export function getCartState(): CartState {
  return { ...cartState };
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}