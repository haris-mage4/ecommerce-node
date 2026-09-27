import Link from 'next/link';
import { Product } from '@/data/products';
import ProductCard from '@/components/ProductCard';

interface ProductSectionProps {
  id: string;
  eyebrow: string;
  title: string;
  products: Product[];
  link: { href: string; label: string };
}

export default function ProductSection({ id, eyebrow, title, products, link }: ProductSectionProps) {
  return (
    <section id={id} className="scroll-mt-20 py-24 lg:py-32 px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
        <div className="text-center md:text-left">
          <p className="text-black/50 text-xs tracking-[0.3em] uppercase mb-4">{eyebrow}</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light tracking-wider text-black">{title}</h2>
          <div className="w-12 h-px bg-black/30 mx-auto md:mx-0 mt-6" />
        </div>
        <Link
          href={link.href}
          className="self-center md:self-auto text-black/60 hover:text-black text-xs tracking-[0.2em] uppercase border-b border-black/30 hover:border-black/60 pb-1 transition-all duration-300"
        >
          {link.label}
        </Link>
      </div>
      <div className={`grid grid-cols-1 sm:grid-cols-2 ${products.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-x-6 gap-y-12`}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
