export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: 'mens' | 'womens' | 'unisex';
  categoryLabel: string;
  size: string;
  description: string;
  longDescription: string;
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  image: string;
  featured: boolean;
  bestseller: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Oud Royale',
    slug: 'oud-royale',
    price: 3500,
    category: 'mens',
    categoryLabel: "Men's",
    size: '50ml',
    description: 'A regal blend of precious oud, warm amber, and creamy sandalwood.',
    longDescription: 'Oud Royale is a masterfully crafted fragrance that embodies masculine sophistication. The rare oud wood forms the heart of this majestic scent, complemented by warm amber undertones and a smooth sandalwood finish. Perfect for the man who commands attention without saying a word.',
    notes: {
      top: ['Bergamot', 'Saffron'],
      middle: ['Oud', 'Rose'],
      base: ['Amber', 'Sandalwood', 'Musk'],
    },
    image: '/images/products/oud-royale.jpg',
    featured: true,
    bestseller: true,
  },
  {
    id: '2',
    name: 'Amber Wood',
    slug: 'amber-wood',
    price: 4000,
    category: 'unisex',
    categoryLabel: 'Unisex',
    size: '50ml',
    description: 'A warm, enveloping fragrance of amber, cedarwood, and soft musk.',
    longDescription: 'Amber Wood captures the essence of a serene forest at dusk. Rich amber resin mingles with aromatic cedarwood, while a veil of soft musk adds an intimate warmth. This versatile unisex fragrance transitions effortlessly from day to night.',
    notes: {
      top: ['Pink Pepper', 'Cardamom'],
      middle: ['Amber', 'Cedarwood'],
      base: ['Musk', 'Vetiver', 'Vanilla'],
    },
    image: '/images/products/amber-wood.jpg',
    featured: true,
    bestseller: false,
  },
  {
    id: '3',
    name: 'Velvet Noir',
    slug: 'velvet-noir',
    price: 4500,
    category: 'womens',
    categoryLabel: "Women's",
    size: '50ml',
    description: 'An opulent feminine fragrance with dark rose, plum, and vanilla orchid.',
    longDescription: 'Velvet Noir is a luxurious feminine creation that drapes you in an aura of mystery. Dark Bulgarian rose meets succulent plum, while vanilla orchid adds a seductive depth. A fragrance for the woman who embraces her power with grace.',
    notes: {
      top: ['Plum', 'Black Currant'],
      middle: ['Dark Rose', 'Jasmine'],
      base: ['Vanilla Orchid', 'Patchouli', 'Cashmere Wood'],
    },
    image: '/images/products/velvet-noir.jpg',
    featured: true,
    bestseller: true,
  },
  {
    id: '4',
    name: 'Midnight Santal',
    slug: 'midnight-santal',
    price: 3800,
    category: 'mens',
    categoryLabel: "Men's",
    size: '50ml',
    description: 'A sophisticated blend of sandalwood, leather, and smoky incense.',
    longDescription: 'Midnight Santal evokes the mystique of an evening in a grand library. Creamy sandalwood is enriched with supple leather accords and wisps of smoky incense. This distinguished fragrance speaks to refined taste and quiet confidence.',
    notes: {
      top: ['Black Pepper', 'Lavender'],
      middle: ['Sandalwood', 'Leather'],
      base: ['Incense', 'Tonka Bean', 'Smoky Accord'],
    },
    image: '/images/products/midnight-santal.jpg',
    featured: true,
    bestseller: false,
  },
  {
    id: '5',
    name: 'Rose Elixir',
    slug: 'rose-elixir',
    price: 5000,
    category: 'womens',
    categoryLabel: "Women's",
    size: '50ml',
    description: 'A precious elixir of Damascena rose, saffron, and golden amber.',
    longDescription: 'Rose Elixir is the crown jewel of our collection. Rare Damascena rose petals are infused with precious saffron threads and enveloped in golden amber. This extraordinary fragrance is a celebration of timeless femininity and uncompromising luxury.',
    notes: {
      top: ['Saffron', 'Bergamot'],
      middle: ['Damascena Rose', 'Peony'],
      base: ['Golden Amber', 'Oud', 'White Musk'],
    },
    image: '/images/products/rose-elixir.jpg',
    featured: true,
    bestseller: true,
  },
  {
    id: '6',
    name: 'Cedar & Smoke',
    slug: 'cedar-and-smoke',
    price: 3200,
    category: 'unisex',
    categoryLabel: 'Unisex',
    size: '50ml',
    description: 'A bold, woody fragrance with Virginia cedar, birch tar, and warm spices.',
    longDescription: 'Cedar & Smoke is an audacious creation for the free spirit. Virginia cedarwood provides a robust foundation, while birch tar adds a distinctive smoky character. Warm spices weave through the composition, creating a fragrance that is both primal and refined.',
    notes: {
      top: ['Juniper', 'Black Pepper'],
      middle: ['Virginia Cedar', 'Birch Tar'],
      base: ['Vetiver', 'Labdanum', 'Amber'],
    },
    image: '/images/products/cedar-smoke.jpg',
    featured: false,
    bestseller: false,
  },
  {
    id: '7',
    name: 'White Musk Intense',
    slug: 'white-musk-intense',
    price: 2800,
    category: 'unisex',
    categoryLabel: 'Unisex',
    size: '50ml',
    description: 'A clean, sensual musk fragrance with iris, white tea, and soft woods.',
    longDescription: 'White Musk Intense is a masterclass in understated elegance. Pure white musk is elevated with delicate iris and the clarity of white tea. Soft woods provide a gentle warmth, creating a fragrance that feels like a second skin.',
    notes: {
      top: ['White Tea', 'Aldehydes'],
      middle: ['Iris', 'White Musk'],
      base: ['Soft Woods', 'Cashmeran', 'Ambrette'],
    },
    image: '/images/products/white-musk.jpg',
    featured: true,
    bestseller: false,
  },
  {
    id: '8',
    name: 'Black Orchid Noir',
    slug: 'black-orchid-noir',
    price: 4200,
    category: 'womens',
    categoryLabel: "Women's",
    size: '50ml',
    description: 'A dark, intoxicating fragrance with black orchid, dark chocolate, and patchouli.',
    longDescription: 'Black Orchid Noir is a daring exploration of dark luxury. The exotic black orchid blooms amidst rich dark chocolate and earthy patchouli. This intoxicating fragrance is not for the faint of heart — it is for those who dare to be unforgettable.',
    notes: {
      top: ['Truffle', 'Black Plum'],
      middle: ['Black Orchid', 'Dark Chocolate'],
      base: ['Patchouli', 'Vanilla Absolute', 'Sandalwood'],
    },
    image: '/images/products/black-orchid.jpg',
    featured: false,
    bestseller: true,
  },
];

export const categories = [
  { id: 'all', label: 'All Fragrances' },
  { id: 'mens', label: "Men's Fragrances" },
  { id: 'womens', label: "Women's Fragrances" },
  { id: 'unisex', label: 'Unisex Fragrances' },
  { id: 'bestseller', label: 'Best Sellers' },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.featured))
    .slice(0, limit);
}
