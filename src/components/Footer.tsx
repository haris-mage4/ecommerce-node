import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="text-white text-lg tracking-[0.3em] font-light">
                NOIR <span className="font-normal">ESSENCE</span>
              </span>
            </Link>
            <p className="mt-4 text-white/40 text-sm leading-relaxed max-w-xs">
              {siteConfig.description}
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white text-xs tracking-[0.2em] uppercase mb-6">Shop</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/shop?category=mens"
                  className="text-white/40 hover:text-white/70 text-sm transition-colors duration-300"
                >
                  Men&apos;s Fragrances
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=womens"
                  className="text-white/40 hover:text-white/70 text-sm transition-colors duration-300"
                >
                  Women&apos;s Fragrances
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=unisex"
                  className="text-white/40 hover:text-white/70 text-sm transition-colors duration-300"
                >
                  Unisex Fragrances
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=bestseller"
                  className="text-white/40 hover:text-white/70 text-sm transition-colors duration-300"
                >
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white text-xs tracking-[0.2em] uppercase mb-6">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-white/40 hover:text-white/70 text-sm transition-colors duration-300"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white/40 hover:text-white/70 text-sm transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white/70 text-sm transition-colors duration-300"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white/70 text-sm transition-colors duration-300"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white text-xs tracking-[0.2em] uppercase mb-6">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-white/40 hover:text-white/70 text-sm transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="text-white/40 hover:text-white/70 text-sm transition-colors duration-300"
                >
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/refund-policy"
                  className="text-white/40 hover:text-white/70 text-sm transition-colors duration-300"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/5">
          <p className="text-white/30 text-xs tracking-wider text-center">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
