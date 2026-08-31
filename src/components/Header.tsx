'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { count, setIsOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-black/95 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="text-white text-xl tracking-[0.3em] font-light">
              NOIR <span className="font-normal">ESSENCE</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            <Link
              href="/shop"
              className="text-white/70 hover:text-white text-[13px] tracking-[0.15em] uppercase transition-colors duration-300"
            >
              Shop
            </Link>
            <Link
              href="/shop?category=bestseller"
              className="text-white/70 hover:text-white text-[13px] tracking-[0.15em] uppercase transition-colors duration-300"
            >
              Collections
            </Link>
            <Link
              href="/about"
              className="text-white/70 hover:text-white text-[13px] tracking-[0.15em] uppercase transition-colors duration-300"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-white/70 hover:text-white text-[13px] tracking-[0.15em] uppercase transition-colors duration-300"
            >
              Contact
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-6">
            {/* Cart */}
            <Link
              href="/cart"
              className="relative text-white/70 hover:text-white transition-colors duration-300"
              aria-label="Order bag"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-medium w-5 h-5 rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white/70 hover:text-white transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 9h16.5m-16.5 6.75h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-500 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-black/95 backdrop-blur-md border-t border-white/10 px-6 py-8 space-y-6">
          <Link
            href="/shop"
            className="block text-white/70 hover:text-white text-sm tracking-[0.15em] uppercase transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Shop
          </Link>
          <Link
            href="/shop?category=bestseller"
            className="block text-white/70 hover:text-white text-sm tracking-[0.15em] uppercase transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Collections
          </Link>
          <Link
            href="/about"
            className="block text-white/70 hover:text-white text-sm tracking-[0.15em] uppercase transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="block text-white/70 hover:text-white text-sm tracking-[0.15em] uppercase transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
