'use client';

import Link from 'next/link';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/whatsapp';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      size: product.size,
      image: product.image,
      slug: product.slug,
    });
  };

  return (
    <div className="group">
      {/* Image Container */}
      <Link href={`/product/${product.slug}`} className="block relative overflow-hidden bg-neutral-900 aspect-[3/4]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 z-10" />
        {/* Placeholder for product image */}
        <div className="w-full h-full flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
          <div className="text-center">
            <div className="w-20 h-32 mx-auto border border-white/20 rounded-sm flex items-center justify-center">
              <span className="text-white/30 text-xs tracking-wider uppercase">Image</span>
            </div>
          </div>
        </div>
        {/* Badges */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
          {product.bestseller && (
            <span className="bg-white text-black text-[10px] tracking-[0.15em] uppercase px-3 py-1">
              Best Seller
            </span>
          )}
          {product.featured && !product.bestseller && (
            <span className="bg-white/10 backdrop-blur text-white text-[10px] tracking-[0.15em] uppercase px-3 py-1">
              Featured
            </span>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="mt-5 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-white/40 text-[11px] tracking-[0.15em] uppercase">
            {product.categoryLabel} — {product.size}
          </span>
        </div>
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-white text-base tracking-wide font-light hover:text-white/70 transition-colors duration-300">
            {product.name}
          </h3>
        </Link>
        <p className="text-white/40 text-sm leading-relaxed line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-white text-base tracking-wider">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={handleAddToCart}
            className="text-white/50 hover:text-white text-[11px] tracking-[0.15em] uppercase border border-white/20 hover:border-white/50 px-4 py-2 transition-all duration-300"
          >
            Add to Order
          </button>
        </div>
      </div>
    </div>
  );
}
