'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/whatsapp';
import QuantitySelector from '@/components/QuantitySelector';

interface Props {
  product: Product;
}

export default function ProductDetailClient({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem(
      {
        productId: product.id,
        name: product.name,
        price: product.price,
        size: product.size,
        image: product.image,
        slug: product.slug,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="mb-8 flex items-center gap-2 text-sm">
        <Link href="/shop" className="text-white/30 hover:text-white/60 transition-colors duration-300">
          Shop
        </Link>
        <span className="text-white/20">/</span>
        <span className="text-white/60">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Product Image */}
        <div className="aspect-[3/4] bg-neutral-900 border border-white/5 flex items-center justify-center">
          <div className="text-center">
            <div className="w-32 h-48 mx-auto border border-white/20 rounded-sm flex items-center justify-center">
              <span className="text-white/30 text-xs tracking-wider uppercase">Product Image</span>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <p className="text-white/30 text-[11px] tracking-[0.2em] uppercase mb-4">
            {product.categoryLabel} — {product.size}
          </p>
          <h1 className="text-3xl md:text-4xl font-light tracking-wider text-white mb-4">
            {product.name}
          </h1>
          <p className="text-2xl text-white/80 tracking-wider mb-8">
            {formatPrice(product.price)}
          </p>

          <div className="w-12 h-px bg-white/20 mb-8" />

          <p className="text-white/40 text-base leading-relaxed mb-8">
            {product.longDescription}
          </p>

          {/* Fragrance Notes */}
          <div className="mb-10 space-y-4">
            <h3 className="text-white text-xs tracking-[0.2em] uppercase">Fragrance Notes</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="border border-white/10 p-4">
                <p className="text-white/30 text-[10px] tracking-[0.15em] uppercase mb-2">Top</p>
                <p className="text-white/60 text-sm">{product.notes.top.join(', ')}</p>
              </div>
              <div className="border border-white/10 p-4">
                <p className="text-white/30 text-[10px] tracking-[0.15em] uppercase mb-2">Middle</p>
                <p className="text-white/60 text-sm">{product.notes.middle.join(', ')}</p>
              </div>
              <div className="border border-white/10 p-4">
                <p className="text-white/30 text-[10px] tracking-[0.15em] uppercase mb-2">Base</p>
                <p className="text-white/60 text-sm">{product.notes.base.join(', ')}</p>
              </div>
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="flex items-center gap-6 mb-6">
            <QuantitySelector
              quantity={quantity}
              onIncrease={() => setQuantity(quantity + 1)}
              onDecrease={() => setQuantity(Math.max(1, quantity - 1))}
            />
            <button
              onClick={handleAdd}
              className={`flex-1 py-4 text-xs tracking-[0.2em] uppercase transition-all duration-500 ${
                added
                  ? 'bg-green-900 text-green-200 border border-green-800'
                  : 'bg-white text-black hover:bg-white/90'
              }`}
            >
              {added ? 'Added to Order' : 'Add to Order'}
            </button>
          </div>

          <Link
            href="/cart"
            className="block text-center text-white/40 hover:text-white/70 text-xs tracking-[0.15em] uppercase border border-white/20 hover:border-white/40 py-3 transition-all duration-300"
          >
            View Order Bag
          </Link>
        </div>
      </div>
    </div>
  );
}
