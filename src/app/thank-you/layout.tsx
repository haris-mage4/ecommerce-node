import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thank You for Your Order',
  description: 'Your order has been received. We will confirm it via WhatsApp shortly.',
};

export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return children;
}
