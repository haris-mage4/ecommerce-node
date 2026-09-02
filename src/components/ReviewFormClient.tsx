'use client';

import dynamic from 'next/dynamic';

const ReviewForm = dynamic(() => import('./ReviewForm'), { ssr: false });

export function ReviewFormClient(props: { productId: string; productName: string }) {
  return <ReviewForm {...props} />;
}
