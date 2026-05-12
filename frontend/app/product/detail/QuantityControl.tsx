"use client";

interface QuantityControlProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
}

export default function QuantityControl({
  quantity,
  onChange,
  min = 1,
  max,
}: QuantityControlProps) {
  const handleDecrease = () => {
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (max === undefined || quantity < max) {
      onChange(quantity + 1);
    }
  };

  const isMaxReached = max !== undefined && quantity >= max;

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-gray-900">Quantity:</span>
      <div className="flex items-center rounded-md border border-gray-300 bg-gray-50">
        <button
          onClick={handleDecrease}
          disabled={quantity <= min}
          className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="w-12 text-center font-medium text-gray-900">{quantity}</span>
        <button
          onClick={handleIncrease}
          disabled={isMaxReached}
          className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      {max !== undefined && (
        <span className="text-sm text-gray-500">
          ({max} available)
        </span>
      )}
    </div>
  );
}