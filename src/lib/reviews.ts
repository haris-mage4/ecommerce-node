'use client';

export interface Review {
  id: string;
  productId: string;
  productName: string;
  author: string;
  rating: number; // 1–5
  title: string;
  body: string;
  date: string; // ISO string
}

const REVIEWS_KEY = 'noir-essence-reviews';

// Seeded sample reviews — shown before any user reviews exist
const SEED_REVIEWS: Review[] = [
  {
    id: 'seed-1',
    productId: '1',
    productName: 'Oud Royale',
    author: 'Zain A.',
    rating: 5,
    title: 'Absolutely regal',
    body: `The longevity of Oud Royale is unmatched. I wore it to a wedding and got compliments all night. A true statement fragrance.`,
    date: '2026-08-15T10:00:00Z',
  },
  {
    id: 'seed-2',
    productId: '3',
    productName: 'Velvet Noir',
    author: 'Sana M.',
    rating: 5,
    title: 'My signature scent',
    body: `I've been looking for the perfect evening fragrance for years. Velvet Noir is it — dark, feminine, and impossibly elegant.`,
    date: '2026-08-20T14:30:00Z',
  },
  {
    id: 'seed-3',
    productId: '2',
    productName: 'Amber Wood',
    author: 'Hamza R.',
    rating: 4,
    title: 'Warm and versatile',
    body: 'Perfect unisex scent. Works great in both casual and formal settings. The amber lasts well into the evening.',
    date: '2026-08-22T09:15:00Z',
  },
  {
    id: 'seed-4',
    productId: '5',
    productName: 'Rose Elixir',
    author: 'Fatima K.',
    rating: 5,
    title: 'Worth every rupee',
    body: `The saffron and rose combination is intoxicating. I've received so many compliments since I started wearing this. Highly recommend.`,
    date: '2026-08-25T16:00:00Z',
  },
  {
    id: 'seed-5',
    productId: '4',
    productName: 'Midnight Santal',
    author: 'Omar B.',
    rating: 5,
    title: 'Sophisticated and timeless',
    body: `Midnight Santal is the kind of fragrance that makes people stop and ask what you're wearing. Sandalwood done perfectly.`,
    date: '2026-08-28T11:00:00Z',
  },
  {
    id: 'seed-6',
    productId: '1',
    productName: 'Oud Royale',
    author: 'Ali H.',
    rating: 5,
    title: 'Best oud in Pakistan',
    body: `I've tried many oud fragrances and this is by far the best value I've found. Rich, deep, and incredibly long-lasting.`,
    date: '2026-08-30T13:00:00Z',
  },
  {
    id: 'seed-7',
    productId: '7',
    productName: 'White Musk Intense',
    author: 'Mariam S.',
    rating: 4,
    title: 'Clean and addictive',
    body: 'Such a clean, skin-like scent. I wear it every day to the office and it never feels too much. Really beautiful.',
    date: '2026-09-01T08:30:00Z',
  },
  {
    id: 'seed-8',
    productId: '8',
    productName: 'Black Orchid Noir',
    author: 'Nadia F.',
    rating: 5,
    title: 'Daring and unforgettable',
    body: 'This fragrance is absolutely bold. I wore it to an event and it was the talk of the evening. Not for the shy!',
    date: '2026-09-01T20:00:00Z',
  },
];

function loadAll(): Review[] {
  if (typeof window === 'undefined') return SEED_REVIEWS;
  try {
    const raw = localStorage.getItem(REVIEWS_KEY);
    const userReviews: Review[] = raw ? JSON.parse(raw) : [];
    // Merge: seed reviews first, user reviews appended (deduped by id)
    const ids = new Set(userReviews.map((r) => r.id));
    const seeds = SEED_REVIEWS.filter((r) => !ids.has(r.id));
    return [...seeds, ...userReviews].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch {
    return SEED_REVIEWS;
  }
}

function saveUserReview(review: Review): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(REVIEWS_KEY);
    const existing: Review[] = raw ? JSON.parse(raw) : [];
    existing.push(review);
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(existing));
  } catch {
    // ignore
  }
}

export function getAllReviews(): Review[] {
  return loadAll();
}

export function getReviewsByProduct(productId: string): Review[] {
  return loadAll().filter((r) => r.productId === productId);
}

export function getAverageRating(productId: string): number {
  const reviews = getReviewsByProduct(productId);
  if (reviews.length === 0) return 0;
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
}

export function addReview(
  data: Omit<Review, 'id' | 'date'>
): Review {
  const review: Review = {
    ...data,
    id: `user-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    date: new Date().toISOString(),
  };
  saveUserReview(review);
  return review;
}

export function getTopReviews(limit = 6): Review[] {
  return loadAll()
    .filter((r) => r.rating >= 4)
    .slice(0, limit);
}
