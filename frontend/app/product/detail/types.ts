export interface SKU {
  id: string;
  variantName: string;
  price: number;
  stock: number;
}

export interface VariantOption {
  name: string;
  values: string[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  images: string[];
  variants: VariantOption[];
  skus: SKU[];
}

export interface CartItem {
  productId: string;
  skuId: string;
  quantity: number;
}

export type CartState = {
  items: CartItem[];
  totalCount: number;
};