"use client";

import { useState, useEffect } from "react";
import { Product, SKU } from "./types";
import {
  fetchProduct,
  addToCart,
  getCurrentSku,
  formatPrice,
} from "./data";
import ProductGallery from "./ProductGallery";
import VariantSelector from "./VariantSelector";
import QuantityControl from "./QuantityControl";
import AddToCartButton from "./AddToCartButton";

interface ProductDetailProps {
  initialProduct?: Product;
}

export default function ProductDetail({ initialProduct }: ProductDetailProps) {
  const [product, setProduct] = useState<Product | null>(initialProduct || null);
  const [loading, setLoading] = useState(!initialProduct);
  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [cartMessage, setCartMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [cartCount, setCartCount] = useState(0);

  // Fetch product on mount if not provided
  useEffect(() => {
    if (!initialProduct) {
      loadProduct();
    }
  }, [initialProduct]);

  async function loadProduct() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProduct();
      setProduct(data);
      // Set default selections
      setSelectedColor(data.variants[0].values[0]);
      setSelectedSize(data.variants[1].values[0]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load product");
    } finally {
      setLoading(false);
    }
  }

  // Get current SKU based on selections
  let currentSku: SKU | undefined;
  if (product && selectedColor && selectedSize) {
    currentSku = getCurrentSku(product, selectedColor, selectedSize);
  }

  const handleVariantSelect = (name: string, value: string) => {
    if (name === "Color") {
      setSelectedColor(value);
    } else if (name === "Size") {
      setSelectedSize(value);
    }
  };

  const handleAddToCart = async () => {
    if (!product || !currentSku) return;

    setIsAddingToCart(true);
    setCartMessage(null);

    try {
      const result = await addToCart(product.id, currentSku.id, quantity);
      if (result.success) {
        setCartMessage({ type: "success", text: "Added to cart successfully!" });
        setCartCount(result.cartState.totalCount);

        // Track analytics event (bonus)
        console.log("add_to_cart", {
          product_id: product.id,
          sku_id: currentSku.id,
          quantity,
          price: currentSku.price,
        });
      }
    } catch (err) {
      setCartMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to add to cart",
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="mx-auto max-w-6xl p-6">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Gallery skeleton */}
          <div className="space-y-3">
            <div className="aspect-square animate-pulse rounded-lg bg-gray-200" />
            <div className="flex gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 w-16 animate-pulse rounded-md bg-gray-200" />
              ))}
            </div>
          </div>
          {/* Info skeleton */}
          <div className="space-y-4">
            <div className="h-8 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
            <div className="flex gap-2">
              <div className="h-10 w-16 animate-pulse rounded bg-gray-200" />
              <div className="h-10 w-16 animate-pulse rounded bg-gray-200" />
            </div>
            <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-red-500">{error || "Product not found"}</div>
      </div>
    );
  }

  const isOutOfStock = currentSku?.stock === 0;

  return (
    <div className="mx-auto max-w-6xl p-6 bg-white">
      {/* Cart notification */}
      {cartMessage && (
        <div
          className={`mb-4 rounded-md p-4 ${
            cartMessage.type === "success"
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-800"
          }`}
        >
          {cartMessage.text}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Product Gallery */}
        <div>
          <ProductGallery images={product.images} />
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            <div className="mt-1">
              <span className="text-2xl font-semibold text-gray-900">
                {currentSku ? formatPrice(currentSku.price) : formatPrice(product.basePrice)}
              </span>
            </div>
            <div className="mt-2 flex items-center gap-4">
              {isOutOfStock ? (
                <span className="text-sm font-medium text-red-600">
                  Out of Stock
                </span>
              ) : currentSku && currentSku.stock > 0 ? (
                <span className="text-sm font-medium text-green-600">
                  In Stock
                </span>
              ) : (
                <span className="text-sm text-gray-500">
                  Selecting variant...
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="text-gray-600 text-sm">{product.description}</div>

          {/* Variant Selector */}
          <VariantSelector
            variants={product.variants}
            selectedValues={{ Color: selectedColor, Size: selectedSize }}
            onSelect={handleVariantSelect}
            disabled={loading}
          />

          {/* Quantity Control */}
          <div>
            <QuantityControl
              quantity={quantity}
              onChange={setQuantity}
              min={1}
              max={currentSku?.stock}
            />
          </div>

          {/* Add to Cart Button */}
          <AddToCartButton
            onClick={handleAddToCart}
            loading={isAddingToCart}
            disabled={!currentSku || isOutOfStock}
          />

          {/* Cart count indicator */}
          {cartCount > 0 && (
            <div className="text-center text-sm text-gray-500">
              Cart: {cartCount} item{cartCount !== 1 ? "s" : ""}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}