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
        <Link href="/shop" className="text-black/40 hover:text-black/70 transition-colors duration-300">
          Shop
        </Link>
        <span className="text-black/25">/</span>
        <span className="text-black/70">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Product Image */}
        <div className="aspect-[3/4] bg-[#e4e1d9] border border-black/10 flex items-center justify-center">
          <div className="text-center">
            <div className="w-32 h-48 mx-auto border border-black/20 rounded-sm flex items-center justify-center">
              <span className="text-black/35 text-xs tracking-wider uppercase">Product Image</span>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <p className="text-black/50 text-[11px] tracking-[0.2em] uppercase mb-4">
            {product.categoryLabel} — {product.size}
          </p>
          <h1 className="text-3xl md:text-4xl font-light tracking-wider text-black mb-4">
            {product.name}
          </h1>
          <p className="text-2xl text-black/75 tracking-wider font-semibold mb-8">
            {formatPrice(product.price)}
          </p>

          <div className="w-12 h-px bg-black/20 mb-8" />

          <p className="text-black/60 text-base leading-relaxed mb-8">
            {product.longDescription}
          </p>

          {/* Fragrance Notes */}
          <div className="mb-10 space-y-4">
            <h3 className="text-black text-xs tracking-[0.2em] uppercase font-semibold">Fragrance Notes</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="border border-black/10 bg-white p-4">
                <p className="text-black/45 text-[10px] tracking-[0.15em] uppercase mb-2">Top</p>
                <p className="text-black/70 text-sm">{product.notes.top.join(', ')}</p>
              </div>
              <div className="border border-black/10 bg-white p-4">
                <p className="text-black/45 text-[10px] tracking-[0.15em] uppercase mb-2">Middle</p>
                <p className="text-black/70 text-sm">{product.notes.middle.join(', ')}</p>
              </div>
              <div className="border border-black/10 bg-white p-4">
                <p className="text-black/45 text-[10px] tracking-[0.15em] uppercase mb-2">Base</p>
                <p className="text-black/70 text-sm">{product.notes.base.join(', ')}</p>
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
              className={`flex-1 py-4 text-xs tracking-[0.2em] uppercase transition-all duration-500 font-medium ${
                added
                  ? 'bg-green-600 text-white'
                  : 'bg-black text-white hover:bg-black/85'
              }`}
            >
              {added ? '✓ Added to Order' : 'Add to Order'}
            </button>
          </div>

          <Link
            href="/cart"
            className="block text-center text-black/50 hover:text-black text-xs tracking-[0.15em] uppercase border border-black/20 hover:border-black/50 py-3 transition-all duration-300"
          >
            View Order Bag
          </Link>
        </div>
      </div>
    </div>
  );
}
