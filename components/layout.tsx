"use client";

import React from "react";
import { motion } from "motion/react";
import { Menu, X, PhoneCall } from "lucide-react";
import Image from "next/image";

import { useBooking } from "./booking-context";

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
                {/* TODO: /privacy */}
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                {/* TODO: /terms */}
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                {/* TODO: /cookies */}
                <a href="#" className="hover:text-white transition-colors">
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
          <div className="flex gap-4">
            {/* Social icons placeholders */}
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 cursor-pointer transition-colors">
              <span className="sr-only">Facebook</span>
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
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 cursor-pointer transition-colors">
              <span className="sr-only">Twitter</span>
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
