"use client";

import { useState } from 'react';
import { BookingProvider } from './booking-context';
import { CartFAB } from './pharmacy/cart-fab';
import { CartDrawer } from './pharmacy/cart-drawer';

export function Providers({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <BookingProvider>
      {children}
      {/* Cart FAB and Drawer are mounted globally so they persist across page navigations */}
      <CartFAB onOpen={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </BookingProvider>
  );
}
