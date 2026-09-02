import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { products, getProductBySlug, getRelatedProducts } from '@/data/products';
import ProductDetailClient from './ProductDetailClient';
import ProductCard from '@/components/ProductCard';
import { siteConfig } from '@/lib/config';
import { ReviewSectionClient } from '@/components/ReviewSectionClient';
import { ReviewFormClient } from '@/components/ReviewFormClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | ${siteConfig.name}`,
      description: product.description,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product);

  return (
    <div className="pt-28 pb-20">
      <ProductDetailClient product={product} />

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-24 px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-black/50 text-xs tracking-[0.3em] uppercase mb-4">You May Also Like</p>
            <h2 className="text-2xl md:text-3xl font-light tracking-wider text-black">Related Fragrances</h2>
            <div className="w-12 h-px bg-black/25 mx-auto mt-6" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Product Reviews */}
      <section className="mt-24 mb-8 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <p className="text-black/50 text-xs tracking-[0.3em] uppercase mb-4">Customer Feedback</p>
            <h2 className="text-2xl md:text-3xl font-light tracking-wider text-black">
              Reviews for {product.name}
            </h2>
            <div className="w-12 h-px bg-black/25 mt-6" />
          </div>
        </div>

        <ReviewSectionClient productId={product.id} />
        <ReviewFormClient productId={product.id} productName={product.name} />
      </section>
    </div>
  );
}
