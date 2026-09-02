'use client';

import dynamic from 'next/dynamic';

const ReviewSection = dynamic(() => import('./ReviewSection'), { ssr: false });

export function ReviewSectionClient(props: { productId?: string; limit?: number }) {
  return <ReviewSection {...props} />;
}
