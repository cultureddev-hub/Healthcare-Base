"use client";

import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "@/lib/store/cart-store";

interface CartFABProps {
  onOpen: () => void;
}

export function CartFAB({ onOpen }: CartFABProps) {
  const { totalItems, isHydrated } = useCart();
  const count = totalItems();

  // Do not render until localStorage has been rehydrated — prevents
  // a "0 items" badge flash on pages where the cart has items.
  if (!isHydrated || count === 0) return null;

  return (
    <AnimatePresence>
      <motion.button
        key="cart-fab"
        initial={{ opacity: 0, scale: 0.6, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.6, y: 20 }}
        transition={{ type: "spring", damping: 18, stiffness: 260 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={onOpen}
        className="fixed bottom-6 right-6 z-60 w-14 h-14 bg-[#3eb5bd] hover:bg-[#35a0a8] text-white rounded-full shadow-xl shadow-[#3eb5bd]/30 flex items-center justify-center transition-colors focus:outline-none focus:ring-4 focus:ring-[#3eb5bd]/30"
        aria-label={`Open cart — ${count} item${count !== 1 ? "s" : ""}`}
      >
        <ShoppingCart size={22} />
        {/* Badge */}
        <motion.span
          key={count}
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 12, stiffness: 400 }}
          className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none"
        >
          {count > 99 ? "99+" : count}
        </motion.span>
      </motion.button>
    </AnimatePresence>
  );
}
