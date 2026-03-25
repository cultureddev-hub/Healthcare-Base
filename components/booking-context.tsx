"use client";

import React, { createContext, useContext, useState } from 'react';

type BookingContextType = {
  selectedService: { department: string; service: string } | null;
  setSelectedService: (service: { department: string; service: string } | null) => void;
  scrollToBooking: () => void;
  isCatalogueOpen: boolean;
  setIsCatalogueOpen: (isOpen: boolean) => void;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [selectedService, setSelectedService] = useState<{ department: string; service: string } | null>(null);
  const [isCatalogueOpen, setIsCatalogueOpen] = useState(false);

  const scrollToBooking = () => {
    const element = document.getElementById('fast-booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <BookingContext.Provider value={{ selectedService, setSelectedService, scrollToBooking, isCatalogueOpen, setIsCatalogueOpen }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) throw new Error("useBooking must be used within BookingProvider");
  return context;
}
