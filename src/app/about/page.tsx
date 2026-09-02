import { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'About',
  description: `Learn about ${siteConfig.name} - Premium luxury fragrances crafted for the discerning individual.`,
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="pt-28 pb-20 lg:pb-32 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-black/50 text-xs tracking-[0.3em] uppercase mb-6">Our Story</p>
          <h1 className="text-4xl md:text-6xl font-light tracking-wider text-black mb-8">
            The Art of<br />Fragrance
          </h1>
          <div className="w-12 h-px bg-black/25 mx-auto" />
        </div>
      </section>

      {/* Story */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Image */}
            <div className="aspect-[4/5] bg-[#e4e1d9] border border-black/10 flex items-center justify-center order-2 lg:order-1">
              <span className="text-black/30 text-xs tracking-wider">BRAND IMAGE</span>
            </div>
            {/* Text */}
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl md:text-3xl font-light tracking-wider text-black mb-8">
                Born From Passion
              </h2>
              <div className="space-y-6 text-black/60 text-base leading-relaxed">
                <p>
                  {siteConfig.name} was founded with a singular vision: to bring the world&apos;s most exceptional fragrances to Pakistan. We believe that a great fragrance is more than a scent &mdash; it is an extension of who you are.
                </p>
                <p>
                  Our journey began in Karachi, where a deep appreciation for luxury and craftsmanship meets a vibrant, discerning community. We set out to curate a collection that speaks to those who refuse to settle for the ordinary.
                </p>
                <p>
                  Every fragrance in our collection has been personally tested and approved. We work directly with established perfume houses and emerging artisan creators to bring you scents that are rich, complex, and unforgettable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32 bg-[#eceae4] border-y border-black/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-black/50 text-xs tracking-[0.3em] uppercase mb-4">What We Stand For</p>
            <h2 className="text-3xl md:text-4xl font-light tracking-wider text-black">Our Values</h2>
            <div className="w-12 h-px bg-black/25 mx-auto mt-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center bg-white p-8 border border-black/8">
              <h3 className="text-black text-lg tracking-wider font-medium mb-4">Quality</h3>
              <p className="text-black/60 text-sm leading-relaxed">
                We never compromise on quality. Each fragrance is sourced from reputable houses and tested for longevity, projection, and character before it earns a place in our collection.
              </p>
            </div>
            <div className="text-center bg-white p-8 border border-black/8">
              <h3 className="text-black text-lg tracking-wider font-medium mb-4">Authenticity</h3>
              <p className="text-black/60 text-sm leading-relaxed">
                Every product we sell is guaranteed authentic. We maintain direct relationships with our suppliers to ensure that what you receive is exactly what was promised.
              </p>
            </div>
            <div className="text-center bg-white p-8 border border-black/8">
              <h3 className="text-black text-lg tracking-wider font-medium mb-4">Service</h3>
              <p className="text-black/60 text-sm leading-relaxed">
                We believe in personal service. From fragrance consultations to doorstep delivery in Karachi, we ensure that every interaction with {siteConfig.name} is exceptional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Statement */}
      <section className="py-24 lg:py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-black/50 text-xs tracking-[0.3em] uppercase mb-6">Our Promise</p>
          <h2 className="text-2xl md:text-4xl font-light tracking-wider text-black mb-8 leading-relaxed">
            &ldquo;We don&apos;t sell fragrances. We help you discover the scent that becomes part of your identity.&rdquo;
          </h2>
          <div className="w-12 h-px bg-black/25 mx-auto mb-8" />
          <Link
            href="/shop"
            className="inline-block border border-black/30 text-black text-xs tracking-[0.2em] uppercase px-10 py-3.5 hover:bg-black hover:text-white transition-all duration-500"
          >
            Explore Our Collection
          </Link>
        </div>
      </section>
    </div>
  );
}
