"use client";

import { BookingProvider } from './booking-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return <BookingProvider>{children}</BookingProvider>;
}
