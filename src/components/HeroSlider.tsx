'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import BottleArt from '@/components/BottleArt';
import { products } from '@/data/products';
import { testerBoxOptions, testerSize } from '@/data/testers';
import { formatPrice } from '@/lib/whatsapp';

const INTERVAL = 6000;

type Theme = 'light' | 'dark' | 'sand';

interface Slide {
  id: string;
  theme: Theme;
  eyebrow: string;
  title: ReactNode;
  body: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
  visual: ReactNode;
}

const themeClasses: Record<Theme, { bg: string; eyebrow: string; title: string; body: string; primary: string; secondary: string }> = {
  light: {
    bg: 'bg-[#f5f4f0]',
    eyebrow: 'text-black/45',
    title: 'text-black',
    body: 'text-black/60',
    primary: 'bg-black text-white hover:bg-black/85',
    secondary: 'border border-black/30 text-black hover:border-black',
  },
  dark: {
    bg: 'bg-[#111111]',
    eyebrow: 'text-white/45',
    title: 'text-white',
    body: 'text-white/60',
    primary: 'bg-white text-black hover:bg-white/85',
    secondary: 'border border-white/30 text-white hover:border-white',
  },
  sand: {
    bg: 'bg-[#e4e1d9]',
    eyebrow: 'text-black/45',
    title: 'text-black',
    body: 'text-black/60',
    primary: 'bg-black text-white hover:bg-black/85',
    secondary: 'border border-black/30 text-black hover:border-black',
  },
};

const bestSellers = products.filter((p) => p.bestseller).slice(0, 3);
const startingTesterPrice = Math.min(...testerBoxOptions.map((o) => o.price));

const slides: Slide[] = [
  {
    id: 'brand',
    theme: 'light',
    eyebrow: 'Saad Amir · Karachi',
    title: (
      <>
        <span className="block font-serif font-light text-4xl md:text-5xl lg:text-6xl tracking-[0.06em] leading-tight">
          The Art of<br />Signature Scent
        </span>
        <span className="block mt-4 font-script text-3xl md:text-4xl text-black/55">crafted with intention</span>
      </>
    ),
    body: 'Botanical, bold and quietly luxurious. Discover a collection of fragrances made to become part of who you are.',
    primary: { href: '/shop', label: 'Shop Collection' },
    secondary: { href: '/#tester-box', label: 'Build a Tester Box' },
    visual: <Logo preload sizes="(min-width: 768px) 420px, 260px" className="w-52 md:w-80 lg:w-[400px]" />,
  },
  {
    id: 'tester-box',
    theme: 'dark',
    eyebrow: `The Tester Box · From ${formatPrice(startingTesterPrice)}`,
    title: (
      <span className="block font-serif font-light text-4xl md:text-5xl lg:text-6xl tracking-[0.06em] leading-tight">
        Try Before<br />You Commit
      </span>
    ),
    body: `Choose ${testerBoxOptions.map((o) => o.count).join(' or ')} testers of ${testerSize} each and wear them for a few days. The best way to find your signature scent.`,
    primary: { href: '/#tester-box', label: 'Build Your Box' },
    visual: (
      <div className="relative">
        <div className="absolute -inset-10 rounded-full border border-white/10" />
        <div className="relative flex items-end gap-2 md:gap-3 border border-white/20 px-5 pt-10 pb-4 md:px-10">
          {products.slice(0, 5).map((p, i) => (
            <BottleArt
              key={p.id}
              tone={p.tone}
              shape={1}
              label=""
              showSprig={false}
              className={`text-white/85 ${i === 2 ? 'w-14 md:w-20' : 'w-10 md:w-16'}`}
            />
          ))}
        </div>
        <p className="mt-4 text-center text-white/40 text-[10px] tracking-[0.35em] uppercase">
          {testerSize} × {Math.max(...testerBoxOptions.map((o) => o.count))}
        </p>
      </div>
    ),
  },
  {
    id: 'best-sellers',
    theme: 'sand',
    eyebrow: 'Best Sellers',
    title: (
      <span className="block font-serif font-light text-4xl md:text-5xl lg:text-6xl tracking-[0.06em] leading-tight">
        Our Most<br />Loved Scents
      </span>
    ),
    body: `${bestSellers.map((p) => p.name).join(', ')} — the fragrances our customers come back for, again and again.`,
    primary: { href: '/#best-sellers', label: 'Shop Best Sellers' },
    secondary: { href: '/shop', label: 'View All' },
    visual: (
      <div className="flex items-end gap-3 md:gap-6">
        {bestSellers.map((p, i) => (
          <BottleArt
            key={p.id}
            tone={p.tone}
            shape={Number(p.id)}
            showSprig={i === 1}
            className={`text-black/80 ${i === 1 ? 'w-32 md:w-56' : 'w-20 md:w-36'}`}
          />
        ))}
      </div>
    ),
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const pointerStart = useRef<number | null>(null);

  const goTo = (i: number) => setIndex((i + slides.length) % slides.length);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = setTimeout(() => setIndex((i) => (i + 1) % slides.length), INTERVAL);
    return () => clearTimeout(timer);
  }, [index, paused, reducedMotion]);

  const theme = themeClasses[slides[index].theme];
  const isDark = slides[index].theme === 'dark';

  return (
    <section
      className="relative mt-20 overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onPointerDown={(e) => (pointerStart.current = e.clientX)}
      onPointerUp={(e) => {
        if (pointerStart.current === null) return;
        const delta = e.clientX - pointerStart.current;
        pointerStart.current = null;
        if (Math.abs(delta) > 50) goTo(index + (delta < 0 ? 1 : -1));
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') goTo(index + 1);
        if (e.key === 'ArrowLeft') goTo(index - 1);
      }}
    >
      <div className="grid grid-cols-[minmax(0,1fr)]">
        {slides.map((slide, i) => {
          const t = themeClasses[slide.theme];
          const active = i === index;
          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
              aria-hidden={!active}
              inert={!active}
              className={`col-start-1 row-start-1 ${t.bg} transition-opacity duration-1000 ease-out ${active ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              <div className="min-h-[calc(100svh-5rem)] md:h-[calc(100svh-5rem)] md:min-h-[640px] md:max-h-[820px] max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 items-center content-center gap-10 pt-12 pb-28 md:pt-10">
                <div className={`order-2 md:order-1 text-center md:text-left ${active ? 'slide-in' : ''}`}>
                  <p className={`${t.eyebrow} text-[11px] tracking-[0.4em] uppercase mb-6`}>{slide.eyebrow}</p>
                  {i === 0 ? <h1 className={t.title}>{slide.title}</h1> : <h2 className={t.title}>{slide.title}</h2>}
                  <p className={`${t.body} text-base md:text-lg font-light max-w-md mx-auto md:mx-0 mt-6 leading-relaxed`}>
                    {slide.body}
                  </p>
                  <div className="mt-10 flex flex-wrap gap-4 justify-center md:justify-start">
                    <Link
                      href={slide.primary.href}
                      className={`${t.primary} text-xs tracking-[0.2em] uppercase px-10 py-4 transition-all duration-300`}
                    >
                      {slide.primary.label}
                    </Link>
                    {slide.secondary && (
                      <Link
                        href={slide.secondary.href}
                        className={`${t.secondary} text-xs tracking-[0.2em] uppercase px-10 py-4 transition-all duration-300`}
                      >
                        {slide.secondary.label}
                      </Link>
                    )}
                  </div>
                </div>
                <div
                  className={`order-1 md:order-2 flex items-center justify-center transition-all duration-[1200ms] ease-out ${
                    active ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                >
                  {slide.visual}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className={`${theme.eyebrow} text-xs tracking-[0.2em] tabular-nums`}>
              {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </span>
            <div className="flex items-center gap-2">
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === index}
                  className={`relative h-[2px] overflow-hidden transition-all duration-500 ${i === index ? 'w-14' : 'w-6'} ${
                    isDark ? 'bg-white/25' : 'bg-black/20'
                  }`}
                >
                  {i === index && (
                    <span
                      key={index}
                      className={`absolute inset-0 origin-left ${isDark ? 'bg-white' : 'bg-black'}`}
                      style={{
                        animation: reducedMotion ? 'none' : `progress ${INTERVAL}ms linear forwards`,
                        animationPlayState: paused ? 'paused' : 'running',
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {[
              { dir: -1, label: 'Previous slide', d: 'M15.75 19.5L8.25 12l7.5-7.5' },
              { dir: 1, label: 'Next slide', d: 'M8.25 4.5l7.5 7.5-7.5 7.5' },
            ].map((arrow) => (
              <button
                key={arrow.dir}
                onClick={() => goTo(index + arrow.dir)}
                aria-label={arrow.label}
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition-colors duration-300 ${
                  isDark
                    ? 'border-white/25 text-white/70 hover:bg-white hover:text-black'
                    : 'border-black/20 text-black/60 hover:bg-black hover:text-white'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d={arrow.d} />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
