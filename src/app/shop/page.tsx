'use client';

import { Suspense } from 'react';
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { products } from '@/data/products';
import ProductGrid from '@/components/ProductGrid';
import CategoryFilter from '@/components/CategoryFilter';

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    setCategory(categoryParam);
  }, [categoryParam]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Category filter
    if (category === 'bestseller') {
      filtered = filtered.filter((p) => p.bestseller);
    } else if (category !== 'all') {
      filtered = filtered.filter((p) => p.category === category);
    }

    // Search filter
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Featured first, then bestsellers
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          if (a.bestseller && !b.bestseller) return -1;
          if (!a.bestseller && b.bestseller) return 1;
          return 0;
        });
    }

    return filtered;
  }, [search, category, sortBy]);

  return (
    <div className="pt-28 pb-20 px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="text-center mb-16">
        <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-4">Our Collection</p>
        <h1 className="text-3xl md:text-5xl font-light tracking-wider text-white">Shop Fragrances</h1>
        <div className="w-12 h-px bg-white/20 mx-auto mt-6" />
      </div>

      {/* Filters */}
      <div className="space-y-8 mb-12">
        {/* Search */}
        <div className="max-w-md mx-auto">
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search fragrances..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent border border-white/20 text-white placeholder-white/30 text-sm tracking-wider pl-12 pr-4 py-3 focus:outline-none focus:border-white/40 transition-colors duration-300"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center">
          <CategoryFilter selected={category} onSelect={setCategory} />
        </div>

        {/* Sort + Count */}
        <div className="flex items-center justify-between">
          <p className="text-white/30 text-sm tracking-wider">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'fragrance' : 'fragrances'}
          </p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent border border-white/20 text-white/60 text-sm tracking-wider px-4 py-2 focus:outline-none focus:border-white/40 cursor-pointer appearance-none"
          >
            <option value="featured" className="bg-black">Featured</option>
            <option value="price-asc" className="bg-black">Price: Low to High</option>
            <option value="price-desc" className="bg-black">Price: High to Low</option>
            <option value="name" className="bg-black">Name</option>
          </select>
        </div>
      </div>

      {/* Products */}
      <ProductGrid products={filteredProducts} />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-28 pb-20 px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-4">Our Collection</p>
            <h1 className="text-3xl md:text-5xl font-light tracking-wider text-white">Shop Fragrances</h1>
            <div className="w-12 h-px bg-white/20 mx-auto mt-6" />
          </div>
          <div className="text-center py-20">
            <p className="text-white/30 text-sm tracking-wider">Loading fragrances...</p>
          </div>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
