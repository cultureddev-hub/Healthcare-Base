"use client";

import React from "react";
import { motion } from "motion/react";
import { Menu, X, PhoneCall } from "lucide-react";
import Image from "next/image";

import { useBooking } from "./booking-context";
import { LanguageToggle } from "./language-toggle";
import { useLocale } from "@/hooks/use-locale";

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { scrollToBooking, setIsCatalogueOpen } = useBooking();

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#fbfbfb]/80 backdrop-blur-md border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 relative">
          {/* Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex-shrink-0 cursor-pointer">
            <div className="relative w-[185px] h-[60px]">
              <Image
                src="/Assets/SHC_Logo.png"
                alt="Samui Home Clinic"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => setIsCatalogueOpen(true)}
              className="text-sm font-medium text-slate-600 hover:text-[#3eb5bd] transition-colors"
            >
              Services
            </button>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-slate-600 hover:text-[#3eb5bd] transition-colors"
            >
              How it Works
            </a>
            <a
              href="#doctors"
              className="text-sm font-medium text-slate-600 hover:text-[#3eb5bd] transition-colors"
            >
              Our Doctors
            </a>
            <a
              href="#about"
              className="text-sm font-medium text-slate-600 hover:text-[#3eb5bd] transition-colors"
            >
              About Us
            </a>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageToggle variant="navbar" />
            <a href="tel:+660806696915" className="bg-slate-100 hover:bg-slate-200 text-[#080708] px-6 py-2.5 rounded-full text-sm font-medium transition-all hover:shadow-md hover:-translate-y-0.5 flex items-center gap-2">
              <PhoneCall size={16} />
              +66 080-669-6915
            </a>
            <button onClick={scrollToBooking} className="bg-[#3eb5bd] hover:bg-[#35a0a8] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all hover:shadow-lg hover:-translate-y-0.5">
              Book Now
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center ml-auto">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="text-slate-600 hover:text-[#080708] focus:outline-none focus:ring-2 focus:ring-[#3eb5bd] focus:ring-offset-1 rounded-md p-2 cursor-pointer"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-1 shadow-lg"
        >
          <button
            onClick={() => {
              setIsOpen(false);
              setIsCatalogueOpen(true);
            }}
            className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-[#3eb5bd] hover:bg-slate-50"
          >
            Services
          </button>
          <a
            href="#how-it-works"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-[#3eb5bd] hover:bg-slate-50"
          >
            How it Works
          </a>
          <a
            href="#doctors"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-[#3eb5bd] hover:bg-slate-50"
          >
            Our Doctors
          </a>
          <a
            href="#about"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-[#3eb5bd] hover:bg-slate-50"
          >
            About Us
          </a>
          <div className="pt-4 flex flex-col gap-3">
            <div className="flex justify-center">
              <LanguageToggle variant="navbar" />
            </div>
            <a href="tel:+660806696915" className="w-full bg-slate-100 text-[#080708] px-6 py-3 rounded-xl text-base font-medium flex items-center justify-center gap-2">
              <PhoneCall size={18} />
              +66 080-669-6915
            </a>
            <button onClick={scrollToBooking} className="w-full bg-[#3eb5bd] text-white px-6 py-3 rounded-xl text-base font-medium flex items-center justify-center gap-2">
              Book Now
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

export function Footer() {
  const locale = useLocale();
  return (
    <footer className="bg-[#080708] text-slate-300 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="relative w-full max-w-[280px] h-[92px] mb-6">
              <Image
                src="/Assets/SHC_Logo.png"
                alt="Samui Home Clinic"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-sm text-slate-400 mb-6 max-w-xs">
              Providing expert medical care for your family, anytime and
              anywhere. Your health is our priority.
            </p>
            {/* Branch Links */}
            <div className="flex flex-col gap-2 mb-5">
              <a href="https://maps.app.goo.gl/hfATkg4Hj7XUEybQ7" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                <svg className="w-4 h-4 text-[#3eb5bd] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                Chaweng Clinic
              </a>
              <a href="https://maps.app.goo.gl/X4cxxB1y7bCsVPGe7" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                <svg className="w-4 h-4 text-[#3eb5bd] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                Bangrak Clinic
              </a>
              <a href="https://maps.app.goo.gl/2PzKU2FYWFWSp1D2A" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                <svg className="w-4 h-4 text-[#3eb5bd] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                Rajabhat University
              </a>
            </div>
            {/* Opening Hours */}
            <div className="flex flex-col gap-1.5 text-xs">
              <div className="flex items-center gap-1.5 text-[#7fd3d7]">
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Mon–Fri: 9:00 AM – 7:00 PM
              </div>
              <div className="flex items-center gap-1.5 text-[#7fd3d7]">
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Sat–Sun: 9:00 AM – 5:00 PM
              </div>
              <div className="flex items-center gap-1.5 text-amber-400">
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Lunch Break: 12:00 PM – 1:30 PM
              </div>
            </div>

            {/* Canonical NAP (Name, Address, Phone) */}
            <div className="mt-5 pt-5 border-t border-slate-800 flex flex-col gap-2 text-xs text-slate-400">
              <a href="tel:+660806696915" className="flex items-center gap-2 hover:text-white transition-colors">
                <PhoneCall size={12} className="text-[#3eb5bd] shrink-0" />
                +66 080-669-6915 (Main)
              </a>
              <a href="tel:+66922781988" className="flex items-center gap-2 hover:text-white transition-colors">
                <PhoneCall size={12} className="text-[#3eb5bd] shrink-0" />
                +66 92-278-1988
              </a>
              <a href="tel:+6677937288" className="flex items-center gap-2 hover:text-white transition-colors">
                <PhoneCall size={12} className="text-[#3eb5bd] shrink-0" />
                +66 77-937-288
              </a>
              <a href="mailto:info@samuihomeclinic.com" className="hover:text-white transition-colors">
                info@samuihomeclinic.com
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Virtual Consultations
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  In-Person Visits
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Pediatric Care
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Preventive Care
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#doctors" className="hover:text-white transition-colors">
                  Our Doctors
                </a>
              </li>
              <li>
                <a href="/blog/health-screening-koh-samui" className="hover:text-white transition-colors">
                  Latest Articles
                </a>
              </li>
              <li>
                <a href="mailto:info@samuihomeclinic.com" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={`/${locale}/privacy`} className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href={`/${locale}/terms`} className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href={`/${locale}/cookies`} className="hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Samui Home Clinic. All rights
            reserved.
          </p>
          <LanguageToggle variant="footer" />
          <div className="flex gap-4">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/samuihomeclinic"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors"
              aria-label="Samui Home Clinic on Facebook"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/samuihomeclinic?igsh=MW0xYzJrN2ljYXdweQ%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors"
              aria-label="Samui Home Clinic on Instagram"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
