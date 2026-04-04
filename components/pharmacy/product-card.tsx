"use client";

import { useState } from "react";
import { ShoppingCart, CheckCircle2, FlaskConical } from "lucide-react";
import { motion } from "motion/react";
import { useCart } from "@/lib/store/cart-store";
import type { PharmacyProduct } from "@/lib/types/cms";

interface ProductCardProps {
  product: PharmacyProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({
      id: product._id,
      name: product.Item_Name,
      price: product.Price,
      category: product.Category,
      requiresPrescription: product.Requires_Prescription,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 hover:border-[#c9eff2] hover:shadow-md transition-all flex flex-col">
      {/* Header row: category badge + price */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-1.5">
          <span
            className={`text-xs font-bold px-2 py-1 rounded-md ${
              product.Requires_Prescription
                ? "bg-rose-50 text-rose-600"
                : "bg-[#edf9fa] text-[#2d9aa2]"
            }`}
          >
            {product.Category}
          </span>
          {product.Requires_Prescription && (
            <span className="flex items-center gap-0.5 text-[10px] font-bold text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded-md">
              <FlaskConical size={10} />
              Rx
            </span>
          )}
        </div>
        <span className="font-bold text-[#080708] text-sm">
          ฿{product.Price.toLocaleString()}
        </span>
      </div>

      {/* Name */}
      <h3 className="text-base font-bold text-[#080708] mb-1 leading-snug">
        {product.Item_Name}
      </h3>

      {/* Description */}
      {product.Description && (
        <p className="text-sm text-slate-500 mb-4 flex-grow leading-relaxed">
          {product.Description}
        </p>
      )}

      {/* CTA */}
      <motion.button
        onClick={handleAdd}
        whileTap={{ scale: 0.97 }}
        disabled={added}
        className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 mt-auto ${
          added
            ? "bg-emerald-500 text-white border-emerald-500"
            : "border border-slate-200 text-slate-700 hover:bg-[#edf9fa] hover:border-[#c9eff2] hover:text-[#2d9aa2]"
        }`}
        aria-label={added ? "Added to cart" : `Add ${product.Item_Name} to request`}
      >
        {added ? (
          <>
            <CheckCircle2 size={15} />
            Added
          </>
        ) : (
          <>
            <ShoppingCart size={15} />
            Add to Request
          </>
        )}
      </motion.button>
    </div>
  );
}
