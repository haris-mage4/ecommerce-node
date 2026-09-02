'use client';

import { useState } from 'react';
import { addReview } from '@/lib/reviews';
import StarRating from './StarRating';

interface Props {
  productId: string;
  productName: string;
}

const INITIAL = { author: '', rating: 0, title: '', body: '' };

export default function ReviewForm({ productId, productName }: Props) {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.author.trim()) errs.author = 'Your name is required';
    if (form.rating === 0) errs.rating = 'Please select a rating';
    if (!form.title.trim()) errs.title = 'Review title is required';
    if (form.body.trim().length < 20) errs.body = 'Please write at least 20 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    addReview({ ...form, productId, productName });
    window.dispatchEvent(new Event('noir-review-added'));
    setSubmitted(true);
    setForm(INITIAL);
    setTimeout(() => {
      setSubmitted(false);
      setOpen(false);
    }, 3000);
  };

  return (
    <div className="mt-10">
      {!open ? (
        <button
          id="write-review-btn"
          onClick={() => setOpen(true)}
          className="border border-black/30 text-black text-xs tracking-[0.2em] uppercase px-8 py-3.5 hover:bg-black hover:text-white transition-all duration-500"
        >
          Write a Review
        </button>
      ) : (
        <div className="border border-black/10 bg-white p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-black/40 mb-1">
                Reviewing
              </p>
              <h4 className="text-black text-base tracking-wider font-medium">{productName}</h4>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-black/30 hover:text-black/70 transition-colors"
              aria-label="Close review form"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {submitted ? (
            <div className="py-10 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-50 border border-green-200 text-green-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <p className="text-black text-sm tracking-wider font-medium mb-1">Thank you for your review!</p>
              <p className="text-black/45 text-xs tracking-wider">Your feedback helps other customers.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Star Rating */}
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-black/50 mb-3">
                  Your Rating *
                </label>
                <div className="flex items-center gap-1">
                  <StarRating
                    rating={form.rating}
                    size="lg"
                    interactive
                    onRate={(r) => {
                      setForm((f) => ({ ...f, rating: r }));
                      setErrors((e) => ({ ...e, rating: '' }));
                    }}
                  />
                  {form.rating > 0 && (
                    <span className="ml-2 text-black/50 text-xs tracking-wider">
                      {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][form.rating]}
                    </span>
                  )}
                </div>
                {errors.rating && <p className="text-red-500 text-xs mt-1.5">{errors.rating}</p>}
              </div>

              {/* Name */}
              <div>
                <input
                  id="review-author"
                  type="text"
                  placeholder="Your Name *"
                  value={form.author}
                  onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
                  className={`w-full bg-transparent border text-black placeholder-black/35 text-sm tracking-wider px-4 py-3 focus:outline-none transition-colors duration-300 ${
                    errors.author ? 'border-red-400' : 'border-black/20 focus:border-black/50'
                  }`}
                />
                {errors.author && <p className="text-red-500 text-xs mt-1">{errors.author}</p>}
              </div>

              {/* Title */}
              <div>
                <input
                  id="review-title"
                  type="text"
                  placeholder="Review Title * (e.g. Perfect evening scent)"
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  className={`w-full bg-transparent border text-black placeholder-black/35 text-sm tracking-wider px-4 py-3 focus:outline-none transition-colors duration-300 ${
                    errors.title ? 'border-red-400' : 'border-black/20 focus:border-black/50'
                  }`}
                />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
              </div>

              {/* Body */}
              <div>
                <textarea
                  id="review-body"
                  placeholder="Share your experience with this fragrance... *"
                  rows={4}
                  value={form.body}
                  onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
                  className={`w-full bg-transparent border text-black placeholder-black/35 text-sm tracking-wider px-4 py-3 focus:outline-none transition-colors duration-300 resize-none ${
                    errors.body ? 'border-red-400' : 'border-black/20 focus:border-black/50'
                  }`}
                />
                <div className="flex justify-between mt-1">
                  {errors.body ? (
                    <p className="text-red-500 text-xs">{errors.body}</p>
                  ) : (
                    <span />
                  )}
                  <p className="text-black/30 text-xs">{form.body.length} chars</p>
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  type="submit"
                  id="submit-review-btn"
                  className="flex-1 bg-black text-white text-xs tracking-[0.2em] uppercase py-3.5 hover:bg-black/85 transition-all duration-500"
                >
                  Submit Review
                </button>
                <button
                  type="button"
                  onClick={() => { setOpen(false); setForm(INITIAL); setErrors({}); }}
                  className="border border-black/20 text-black/50 text-xs tracking-[0.15em] uppercase px-6 py-3.5 hover:border-black/40 hover:text-black/70 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
