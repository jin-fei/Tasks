"use client";

interface AddToCartButtonProps {
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export default function AddToCartButton({
  onClick,
  loading = false,
  disabled = false,
}: AddToCartButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className="w-full rounded-md bg-yellow-400 border border-yellow-600 px-6 py-3 text-base font-bold text-black hover:bg-yellow-500 hover:border-yellow-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:border-gray-300 disabled:text-gray-500"
    >
      {loading ? "Adding..." : "Add to Cart"}
    </button>
  );
}