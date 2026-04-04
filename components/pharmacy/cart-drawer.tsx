"use client";

import { useRouter } from "next/navigation";
import { X, Trash2, ShoppingCart, FlaskConical, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "@/lib/store/cart-store";
import { useLocale } from "@/hooks/use-locale";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, totalPrice, totalItems, isHydrated } = useCart();
  const router = useRouter();
  const locale = useLocale();

  const handleCheckout = () => {
    onClose();
    router.push(`/${locale}/pharmacy/checkout`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-[#080708]/40 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col"
            aria-label="Your cart"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShoppingCart size={20} className="text-[#3eb5bd]" />
                <h2 className="text-lg font-bold text-[#080708] font-heading">
                  Your Cart
                </h2>
                {isHydrated && totalItems() > 0 && (
                  <span className="text-xs font-bold text-white bg-[#3eb5bd] px-2 py-0.5 rounded-full">
                    {totalItems()}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
                aria-label="Close cart"
              >
                <X size={18} />
              </button>
            </div>

            {/* Items list */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {!isHydrated || items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                    <ShoppingCart size={28} className="text-slate-300" />
                  </div>
                  <p className="text-slate-500 font-medium">Your cart is empty</p>
                  <p className="text-slate-400 text-sm mt-1">
                    Add items from the pharmacy catalogue
                  </p>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100"
                    >
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <p className="text-sm font-semibold text-[#080708] truncate">
                            {item.name}
                          </p>
                          {item.requiresPrescription && (
                            <FlaskConical size={12} className="text-rose-500 shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mb-2">
                          ฿{item.price.toLocaleString()} each
                        </p>

                        {/* Qty stepper */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-white hover:border-[#c9eff2] hover:text-[#3eb5bd] transition-colors text-sm font-bold"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="w-6 text-center text-sm font-bold text-[#080708]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-white hover:border-[#c9eff2] hover:text-[#3eb5bd] transition-colors text-sm font-bold"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Line total + remove */}
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <span className="text-sm font-bold text-[#080708]">
                          ฿{(item.price * item.quantity).toLocaleString()}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-slate-400 hover:text-rose-500 transition-colors"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer — totals + CTA */}
            {isHydrated && items.length > 0 && (
              <div className="px-6 py-5 border-t border-slate-100 bg-white">
                {/* Rx warning */}
                {items.some((i) => i.requiresPrescription) && (
                  <div className="flex items-start gap-2 p-3 bg-rose-50 border border-rose-100 rounded-xl mb-4 text-xs text-rose-700">
                    <FlaskConical size={14} className="shrink-0 mt-0.5" />
                    <p>
                      Your cart contains prescription (Rx) items. You&apos;ll be asked
                      to upload a valid prescription during checkout.
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-slate-500">Total</span>
                  <span className="text-xl font-bold text-[#080708]">
                    ฿{totalPrice().toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#3eb5bd] hover:bg-[#35a0a8] text-white py-3.5 rounded-xl font-semibold text-base transition-all shadow-lg shadow-[#3eb5bd]/20 flex items-center justify-center gap-2 hover:-translate-y-0.5"
                >
                  Proceed to Checkout
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
