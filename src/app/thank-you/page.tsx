import { Suspense } from 'react';
import ThankYouContent from './ThankYouContent';

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-28 pb-20 px-6 lg:px-8 max-w-3xl mx-auto text-center">
          <div className="py-20">
            <div className="w-8 h-8 border border-black/20 border-t-black/70 rounded-full animate-spin mx-auto mb-6" />
            <p className="text-black/40 text-sm tracking-wider">Loading your order…</p>
          </div>
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
