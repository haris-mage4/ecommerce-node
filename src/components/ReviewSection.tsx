'use client';

import { useEffect, useState } from 'react';
import { Review, getReviewsByProduct, getAllReviews } from '@/lib/reviews';
import StarRating from './StarRating';

interface Props {
  productId?: string; // if provided, shows product-specific reviews; otherwise shows all
  limit?: number;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-PK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function RatingBar({ label, count, total }: { label: string; count: number; total: number }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-3 text-xs">
      <span className="text-black/50 w-4 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-black/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-400 rounded-full transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-black/40 w-5 text-right shrink-0">{count}</span>
    </div>
  );
}

export default function ReviewSection({ productId, limit }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  useEffect(() => {
    const all = productId ? getReviewsByProduct(productId) : getAllReviews();
    setReviews(limit ? all.slice(0, limit) : all);
  }, [productId, limit]);

  // Re-sync when new reviews are written (same-tab)
  useEffect(() => {
    const handler = () => {
      const all = productId ? getReviewsByProduct(productId) : getAllReviews();
      setReviews(limit ? all.slice(0, limit) : all);
    };
    window.addEventListener('noir-review-added', handler);
    return () => window.removeEventListener('noir-review-added', handler);
  }, [productId, limit]);

  if (reviews.length === 0) return null;

  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  const counts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div>
      {/* Summary Row */}
      <div className="flex flex-col sm:flex-row gap-8 mb-12 p-8 bg-white border border-black/8">
        {/* Average */}
        <div className="flex flex-col items-center justify-center sm:border-r border-black/10 sm:pr-10 shrink-0">
          <p className="text-5xl font-light text-black tracking-tight mb-2">
            {avg.toFixed(1)}
          </p>
          <StarRating rating={avg} size="md" />
          <p className="text-black/40 text-xs tracking-wider mt-2">
            {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
          </p>
        </div>
        {/* Breakdown bars */}
        <div className="flex-1 space-y-2.5 justify-center flex flex-col">
          {counts.map(({ star, count }) => (
            <RatingBar key={star} label={`${star}★`} count={count} total={reviews.length} />
          ))}
        </div>
      </div>

      {/* Review Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {reviews.map((review) => {
          const isLong = review.body.length > 160;
          const isExpanded = expanded.has(review.id);
          return (
            <div
              key={review.id}
              className="bg-white border border-black/8 p-6 hover:border-black/20 transition-colors duration-300 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-black text-sm font-semibold tracking-wide">{review.author}</p>
                  {!productId && (
                    <p className="text-black/35 text-[11px] tracking-wider mt-0.5">
                      {review.productName}
                    </p>
                  )}
                </div>
                <StarRating rating={review.rating} size="sm" />
              </div>

              {/* Review Title */}
              <p className="text-black text-sm font-medium tracking-wider mb-2 leading-snug">
                &ldquo;{review.title}&rdquo;
              </p>

              {/* Body */}
              <p className="text-black/60 text-sm leading-relaxed flex-1">
                {isLong && !isExpanded ? `${review.body.slice(0, 160)}…` : review.body}
              </p>
              {isLong && (
                <button
                  onClick={() => toggleExpand(review.id)}
                  className="text-black/40 hover:text-black text-xs tracking-wider mt-2 text-left transition-colors"
                >
                  {isExpanded ? 'Show less' : 'Read more'}
                </button>
              )}

              {/* Date */}
              <p className="text-black/30 text-[11px] tracking-wider mt-4">
                {formatDate(review.date)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
