import Link from 'next/link';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { siteConfig } from '@/lib/config';
import { ReviewSectionClient } from '@/components/ReviewSectionClient';

export default function HomePage() {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 6);

  return (
    <div>
      {/* Hero Section — keeps dark/black for dramatic impact */}
      <section className="relative min-h-screen flex items-center justify-center bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black" />
        {/* Decorative element */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <div className="w-96 h-96 border border-white rounded-full" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-white/30 text-xs tracking-[0.4em] uppercase mb-8 animate-fade-in">
            {siteConfig.name}
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-[0.1em] text-white mb-8 animate-fade-in-delay-1">
            THE ESSENCE<br />
            <span className="font-extralight text-white/80">OF LUXURY</span>
          </h1>
          <p className="text-white/40 text-lg md:text-xl font-light max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-delay-2">
            Discover a curated collection of premium fragrances, meticulously crafted for those who appreciate the finer things in life.
          </p>
          <Link
            href="/shop"
            className="inline-block border border-white/30 text-white text-xs tracking-[0.2em] uppercase px-12 py-4 hover:bg-white hover:text-black transition-all duration-500 animate-fade-in-delay-3"
          >
            Shop Collection
          </Link>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-px h-16 bg-gradient-to-b from-transparent to-white/30" />
        </div>
      </section>

      {/* Featured Products — light gray */}
      <section className="py-24 lg:py-32 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-black/50 text-xs tracking-[0.3em] uppercase mb-4">Our Collection</p>
          <h2 className="text-3xl md:text-4xl font-light tracking-wider text-black">Featured Fragrances</h2>
          <div className="w-12 h-px bg-black/30 mx-auto mt-6" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-16">
          <Link
            href="/shop"
            className="inline-block border border-black/30 text-black/70 hover:text-black text-xs tracking-[0.2em] uppercase px-10 py-3.5 hover:border-black/60 transition-all duration-500"
          >
            View All Fragrances
          </Link>
        </div>
      </section>

      {/* Brand Philosophy — slightly darker gray panel */}
      <section className="py-24 lg:py-32 bg-[#eceae4] border-y border-black/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Image placeholder */}
            <div className="aspect-[4/5] bg-[#dedad2] border border-black/10 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-48 mx-auto border border-black/20 flex items-center justify-center">
                  <span className="text-black/30 text-xs tracking-wider">BRAND IMAGE</span>
                </div>
              </div>
            </div>
            {/* Text */}
            <div>
              <p className="text-black/50 text-xs tracking-[0.3em] uppercase mb-6">Our Philosophy</p>
              <h2 className="text-3xl md:text-4xl font-light tracking-wider text-black mb-8 leading-tight">
                Crafted With<br />Intention
              </h2>
              <div className="space-y-6 text-black/65 text-base leading-relaxed">
                <p>
                  At {siteConfig.name}, we believe that fragrance is the most intimate form of self-expression. Each scent in our collection has been carefully selected to embody a distinct character — from bold and commanding to subtle and refined.
                </p>
                <p>
                  Our fragrances are sourced from the finest perfume houses and artisan creators, ensuring that every bottle delivers an exceptional olfactory experience. We don&apos;t follow trends; we curate timeless scents that become part of your identity.
                </p>
                <p>
                  Based in Karachi, we bring the world&apos;s most exquisite fragrances to your doorstep, with the personal touch that only a dedicated fragrance house can provide.
                </p>
              </div>
              <Link
                href="/about"
                className="inline-block mt-10 text-black/60 hover:text-black text-xs tracking-[0.2em] uppercase border-b border-black/30 hover:border-black/60 pb-1 transition-all duration-300"
              >
                Read Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories — light gray */}
      <section className="py-24 lg:py-32 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-black/50 text-xs tracking-[0.3em] uppercase mb-4">Explore</p>
          <h2 className="text-3xl md:text-4xl font-light tracking-wider text-black">Shop by Category</h2>
          <div className="w-12 h-px bg-black/30 mx-auto mt-6" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: "Men's Fragrances", slug: 'mens', count: products.filter(p => p.category === 'mens').length },
            { name: "Women's Fragrances", slug: 'womens', count: products.filter(p => p.category === 'womens').length },
            { name: 'Unisex Fragrances', slug: 'unisex', count: products.filter(p => p.category === 'unisex').length },
            { name: 'Best Sellers', slug: 'bestseller', count: products.filter(p => p.bestseller).length },
          ].map((category) => (
            <Link
              key={category.slug}
              href={`/shop?category=${category.slug}`}
              className="group relative aspect-[3/4] bg-[#e4e1d9] border border-black/10 hover:border-black/30 overflow-hidden transition-all duration-500 flex items-end p-8"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 group-hover:from-black/75 transition-all duration-500" />
              <div className="relative z-20">
                <p className="text-white/60 text-[11px] tracking-[0.15em] uppercase mb-2">
                  {category.count} {category.count === 1 ? 'Fragrance' : 'Fragrances'}
                </p>
                <h3 className="text-white text-lg tracking-wider font-light group-hover:translate-x-2 transition-transform duration-500">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Choose Us — slightly darker panel */}
      <section className="py-24 lg:py-32 bg-[#eceae4] border-y border-black/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-black/50 text-xs tracking-[0.3em] uppercase mb-4">Why {siteConfig.name}</p>
            <h2 className="text-3xl md:text-4xl font-light tracking-wider text-black">The Difference</h2>
            <div className="w-12 h-px bg-black/30 mx-auto mt-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Premium Fragrances',
                description: 'Every scent in our collection is carefully selected for quality and character.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                ),
              },
              {
                title: 'Fast Karachi Delivery',
                description: 'Quick and reliable delivery across Karachi, handled with care by our own team.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                ),
              },
              {
                title: 'Curated Collection',
                description: 'A carefully curated selection of the finest fragrances from around the world.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                ),
              },
              {
                title: 'Easy WhatsApp Ordering',
                description: 'Simple and personal ordering experience through WhatsApp. No complicated checkout.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                  </svg>
                ),
              },
            ].map((feature) => (
              <div key={feature.title} className="text-center p-8 bg-white border border-black/8 hover:border-black/20 hover:shadow-md transition-all duration-500 rounded-sm">
                <div className="text-black/50 flex justify-center mb-6">{feature.icon}</div>
                <h3 className="text-black text-sm tracking-wider font-semibold mb-3">{feature.title}</h3>
                <p className="text-black/60 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews — light gray */}
      <section className="py-24 lg:py-32 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-black/50 text-xs tracking-[0.3em] uppercase mb-4">What They Say</p>
          <h2 className="text-3xl md:text-4xl font-light tracking-wider text-black">
            Customer Reviews
          </h2>
          <div className="w-12 h-px bg-black/30 mx-auto mt-6" />
        </div>
        <ReviewSectionClient limit={6} />
      </section>

      {/* CTA Section — black for contrast */}
      <section className="py-32 lg:py-40 text-center px-6 bg-black">
        <div className="max-w-3xl mx-auto">
          <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-6">{siteConfig.name}</p>
          <h2 className="text-3xl md:text-5xl font-light tracking-wider text-white mb-6">
            Find Your Signature Scent
          </h2>
          <p className="text-white/40 text-lg font-light mb-12 leading-relaxed">
            Every fragrance tells a story. Discover the one that tells yours.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-white text-black text-xs tracking-[0.2em] uppercase px-12 py-4 hover:bg-white/90 transition-all duration-500"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
}
