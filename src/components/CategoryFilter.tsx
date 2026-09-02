'use client';

import { categories } from '@/data/products';

interface CategoryFilterProps {
  selected: string;
  onSelect: (category: string) => void;
}

export default function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`text-[11px] tracking-[0.15em] uppercase px-5 py-2.5 border transition-all duration-300 ${
            selected === cat.id
              ? 'bg-black text-white border-black'
              : 'bg-transparent text-black/50 border-black/20 hover:border-black/50 hover:text-black'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
