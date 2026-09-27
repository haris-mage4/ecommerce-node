'use client';

import { useState } from 'react';
import Link from 'next/link';
import { products } from '@/data/products';
import { testerBoxOptions, testerSize, TESTER_BOX_ID_PREFIX, TESTER_BOX_HREF } from '@/data/testers';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/whatsapp';
import BottleArt from '@/components/BottleArt';

export default function TesterBox() {
  const { addItem } = useCart();
  const [optionId, setOptionId] = useState(testerBoxOptions[testerBoxOptions.length - 1].id);
  const [selected, setSelected] = useState<string[]>([]);
  const [added, setAdded] = useState(false);

  const option = testerBoxOptions.find((o) => o.id === optionId) ?? testerBoxOptions[0];
  const isFull = selected.length === option.count;
  const selectedProducts = products.filter((p) => selected.includes(p.id));
  const fullBottleValue = selectedProducts.reduce((sum, p) => sum + p.price, 0);

  const chooseOption = (id: string) => {
    const next = testerBoxOptions.find((o) => o.id === id);
    if (!next) return;
    setOptionId(id);
    setSelected((s) => s.slice(0, next.count));
    setAdded(false);
  };

  const toggle = (id: string) => {
    setAdded(false);
    setSelected((s) => {
      if (s.includes(id)) return s.filter((x) => x !== id);
      if (s.length >= option.count) return s;
      return [...s, id];
    });
  };

  const surprise = () => {
    const shuffled = [...products].sort(() => Math.random() - 0.5);
    setSelected(shuffled.slice(0, option.count).map((p) => p.id));
    setAdded(false);
  };

  const addToOrder = () => {
    if (!isFull) return;
    // Keep ids in catalogue order so the same selection always merges into one cart line
    const ids = selectedProducts.map((p) => p.id);
    addItem({
      productId: `${TESTER_BOX_ID_PREFIX}-${option.id}-${ids.join('-')}`,
      name: `${option.label} (${selectedProducts.map((p) => p.name).join(', ')})`,
      price: option.price,
      size: `${option.count} × ${testerSize}`,
      image: '/images/brand/saad-amir-monogram.png',
      slug: TESTER_BOX_HREF,
    });
    setSelected([]);
    setAdded(true);
  };

  return (
    <section id="tester-box" className="scroll-mt-20 bg-[#111111] text-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-white/45 text-xs tracking-[0.3em] uppercase mb-4">Try Before You Commit</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light tracking-wider">The Tester Box</h2>
          <div className="w-12 h-px bg-white/30 mx-auto mt-6" />
          <p className="text-white/55 max-w-xl mx-auto mt-6 leading-relaxed">
            Pick your favourites, receive {testerSize} testers of each, and live with them for a few days. Found the one? Order the full bottle.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Builder summary */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 self-start">
            <p className="text-white/45 text-[11px] tracking-[0.25em] uppercase mb-4">1. Choose your box</p>
            <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Tester box size">
              {testerBoxOptions.map((o) => {
                const active = o.id === option.id;
                return (
                  <button
                    key={o.id}
                    role="radio"
                    aria-checked={active}
                    onClick={() => chooseOption(o.id)}
                    className={`text-left border p-4 transition-all duration-300 ${
                      active ? 'border-white bg-white text-black' : 'border-white/20 hover:border-white/50'
                    }`}
                  >
                    <span className="block text-[10px] tracking-[0.2em] uppercase opacity-60">{o.label}</span>
                    <span className="block font-serif text-2xl mt-1">
                      {o.count} × {testerSize}
                    </span>
                    <span className="block text-sm mt-1 font-semibold tracking-wider">{formatPrice(o.price)}</span>
                  </button>
                );
              })}
            </div>

            <p className="text-white/45 text-[11px] tracking-[0.25em] uppercase mt-10 mb-4">
              2. Your selection ({selected.length}/{option.count})
            </p>
            <div className="flex gap-2">
              {Array.from({ length: option.count }).map((_, i) => {
                const product = selectedProducts[i];
                return (
                  <div
                    key={i}
                    className={`flex-1 aspect-[3/5] flex items-center justify-center border transition-all duration-300 ${
                      product ? 'border-white/40 bg-white/5' : 'border-dashed border-white/15'
                    }`}
                    title={product?.name}
                  >
                    {product ? (
                      <BottleArt tone={product.tone} shape={1} label="" showSprig={false} className="w-3/4 text-white/85" />
                    ) : (
                      <span className="text-white/20 text-xs">{i + 1}</span>
                    )}
                  </div>
                );
              })}
            </div>
            {selectedProducts.length > 0 && (
              <p className="text-white/50 text-xs leading-relaxed mt-3">{selectedProducts.map((p) => p.name).join(' · ')}</p>
            )}

            <div className="mt-8 pt-8 border-t border-white/10 flex items-end justify-between">
              <div>
                <p className="text-white/45 text-[11px] tracking-[0.2em] uppercase">Box total</p>
                <p className="font-serif text-3xl mt-1">{formatPrice(option.price)}</p>
              </div>
              {fullBottleValue > 0 && (
                <p className="text-white/40 text-xs text-right max-w-[10rem]">
                  Full bottles: {formatPrice(fullBottleValue)}
                </p>
              )}
            </div>

            <button
              onClick={addToOrder}
              disabled={!isFull}
              className="mt-6 w-full bg-white text-black text-xs tracking-[0.2em] uppercase py-4 transition-all duration-300 hover:bg-white/85 disabled:bg-white/15 disabled:text-white/40 disabled:cursor-not-allowed"
            >
              {isFull ? 'Add Tester Box to Order' : `Select ${option.count - selected.length} more`}
            </button>
            <div className="mt-4 flex items-center justify-between text-xs tracking-wider">
              <button onClick={surprise} className="text-white/55 hover:text-white underline underline-offset-4 transition-colors">
                Surprise me
              </button>
              {selected.length > 0 && (
                <button onClick={() => setSelected([])} className="text-white/40 hover:text-white transition-colors">
                  Clear
                </button>
              )}
            </div>
            <p aria-live="polite" className="mt-4 min-h-5 text-sm text-white/80">
              {added && (
                <>
                  Tester box added.{' '}
                  <Link href="/cart" className="underline underline-offset-4 hover:text-white">
                    View your order
                  </Link>
                </>
              )}
            </p>
          </div>

          {/* Scent picker */}
          <div className="lg:col-span-8">
            <p className="text-white/45 text-[11px] tracking-[0.25em] uppercase mb-4">3. Pick your scents</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
              {products.map((product) => {
                const isSelected = selected.includes(product.id);
                const disabled = !isSelected && isFull;
                return (
                  <button
                    key={product.id}
                    onClick={() => toggle(product.id)}
                    aria-pressed={isSelected}
                    disabled={disabled}
                    className={`group relative text-left border p-4 transition-all duration-300 ${
                      isSelected
                        ? 'border-white bg-white/10'
                        : disabled
                          ? 'border-white/10 opacity-40 cursor-not-allowed'
                          : 'border-white/15 hover:border-white/50'
                    }`}
                  >
                    <span
                      className={`absolute top-3 right-3 w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                        isSelected ? 'bg-white border-white text-black' : 'border-white/30 text-transparent'
                      }`}
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                    <div
                      className="aspect-square flex items-center justify-center mb-4"
                      style={{ backgroundImage: `radial-gradient(circle at 50% 55%, ${product.tone}40, transparent 65%)` }}
                    >
                      <BottleArt
                        tone={product.tone}
                        shape={Number(product.id)}
                        showSprig={false}
                        className="w-1/2 text-white/85 transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <span className="block text-white/45 text-[10px] tracking-[0.15em] uppercase">{product.categoryLabel}</span>
                    <span className="block text-sm tracking-wide mt-1">{product.name}</span>
                    <span className="block text-white/40 text-xs mt-1 line-clamp-2">
                      {product.notes.middle.join(', ')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
