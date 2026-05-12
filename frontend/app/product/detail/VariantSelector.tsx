"use client";

interface VariantSelectorProps {
  variants: { name: string; values: string[] }[];
  selectedValues: Record<string, string>;
  onSelect: (name: string, value: string) => void;
  disabled?: boolean;
}

export default function VariantSelector({
  variants,
  selectedValues,
  onSelect,
  disabled = false,
}: VariantSelectorProps) {
  return (
    <div className="space-y-3">
      {variants.map((variant) => (
        <div key={variant.name}>
          <label className="block text-sm font-medium text-gray-900">
            {variant.name}: <span className="font-normal text-gray-600">{selectedValues[variant.name]}</span>
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            {variant.values.map((value) => {
              const isSelected = selectedValues[variant.name] === value;
              return (
                <button
                  key={value}
                  onClick={() => onSelect(variant.name, value)}
                  disabled={disabled}
                  className={`rounded-md border px-4 py-2 text-sm transition-all ${
                    isSelected
                      ? "border-yellow-600 bg-yellow-400 text-black font-semibold"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50"
                  } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}