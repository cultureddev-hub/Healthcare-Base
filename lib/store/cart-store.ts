/**
 * lib/store/cart-store.ts
 * Zustand global cart store with localStorage persistence
 *
 * SSR Hydration Strategy:
 *   `skipHydration: true` + `onRehydrateStorage` callback stores hydration
 *   state inside the Zustand store itself (via `_hasHydrated`). This avoids
 *   calling `setState` inside a `useEffect`, which triggers cascading renders
 *   and lint warnings. Components read `store._hasHydrated` (exposed as
 *   `isHydrated` in the `useCart()` hook) to gate rendering cart state.
 *
 * Usage in Client Components:
 *   import { useCart } from '@/lib/store/cart-store'
 *   const { items, addItem, totalItems, isHydrated } = useCart()
 *   if (!isHydrated) return null  // prevent hydration flash
 *
 * CartItem type is exported from lib/types/cms.ts so server actions can
 * import it without pulling in client-only Zustand code.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartItem } from '@/lib/types/cms';

// Re-export CartItem from the shared types file for convenience
export type { CartItem } from '@/lib/types/cms';

// ── Store State & Actions ────────────────────────────────────────────────────

interface CartState {
  items: CartItem[];
  /** True once localStorage has been rehydrated on the client. */
  _hasHydrated: boolean;
  _setHasHydrated: (value: boolean) => void;
  addItem: (product: {
    id: string;
    name: string;
    price: number;
    category: string;
    requiresPrescription: boolean;
  }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalPrice: () => number;
  totalItems: () => number;
}

// ── Store Definition ─────────────────────────────────────────────────────────

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      _hasHydrated: false,
      _setHasHydrated: (value) => set({ _hasHydrated: value }),

      addItem: (product) => {
        set((state) => {
          const existing = state.items.find((item) => item.id === product.id);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return {
            items: [
              ...state.items,
              {
                id: product.id,
                name: product.name,
                price: product.price,
                category: product.category,
                requiresPrescription: product.requiresPrescription,
                quantity: 1,
              },
            ],
          };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity < 1) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      totalPrice: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

      totalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: 'shc-pharmacy-cart',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined'
          ? localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
      ),
      // skipHydration prevents auto-rehydration on the server.
      // The onRehydrateStorage callback sets _hasHydrated = true once
      // localStorage data is loaded on the client — no useEffect needed.
      skipHydration: true,
      onRehydrateStorage: () => (state) => {
        state?._setHasHydrated(true);
      },
      // Exclude internal hydration flag from persisted state
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => !key.startsWith('_'))
        ) as CartState,
    }
  )
);

// ── SSR-Safe Hydration Hook ───────────────────────────────────────────────────

/**
 * useCart — SSR-safe cart hook
 *
 * Triggers manual rehydration from localStorage on first access and exposes
 * `isHydrated` (derived from `store._hasHydrated`) to gate DOM rendering.
 * Use this hook in all components that display cart state.
 *
 * @example
 *   const { items, totalItems, addItem, isHydrated } = useCart()
 *   if (!isHydrated) return null
 */
export function useCart() {
  const store = useCartStore();

  // Trigger manual rehydration on first access (idempotent — safe to call repeatedly)
  if (typeof window !== 'undefined' && !store._hasHydrated) {
    useCartStore.persist.rehydrate();
  }

  return {
    ...store,
    isHydrated: store._hasHydrated,
  };
}
