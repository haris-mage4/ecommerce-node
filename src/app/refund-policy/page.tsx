import { Metadata } from 'next';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: `Refund Policy for ${siteConfig.name}`,
};

export default function RefundPolicyPage() {
  return (
    <div className="pt-28 pb-20 px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-black/50 text-xs tracking-[0.3em] uppercase mb-4">Legal</p>
          <h1 className="text-3xl md:text-4xl font-light tracking-wider text-black">Refund Policy</h1>
          <div className="w-12 h-px bg-black/25 mx-auto mt-6" />
        </div>

        <div className="space-y-10 text-black/65 text-sm leading-relaxed">
          <section>
            <h2 className="text-black text-lg tracking-wider font-medium mb-4">Refund Eligibility</h2>
            <p>
              We want you to be completely satisfied with your purchase. If you are not satisfied, you may request a refund within <strong className="text-black font-semibold">3 days of delivery</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-black text-lg tracking-wider font-medium mb-4">Conditions for Return</h2>
            <p>To be eligible for a refund, the following conditions must be met:</p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-black/55">
              <li>The refund request must be made within 3 days of receiving the product</li>
              <li>The product must be unused and in its original packaging</li>
              <li>The product seal must be intact</li>
              <li>The product must not be damaged due to customer negligence</li>
            </ul>
          </section>

          <section>
            <h2 className="text-black text-lg tracking-wider font-medium mb-4">How to Request a Refund</h2>
            <p>
              To request a refund, please contact us through WhatsApp at{' '}
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black font-medium hover:underline transition-colors"
              >
                {siteConfig.phone}
              </a>{' '}
              or email us at{' '}
              <a href={`mailto:${siteConfig.email}`} className="text-black font-medium hover:underline transition-colors">
                {siteConfig.email}
              </a>.
            </p>
            <p className="mt-3">
              Please include your order details and the reason for the refund request.
            </p>
          </section>

          <section>
            <h2 className="text-black text-lg tracking-wider font-medium mb-4">Refund Process</h2>
            <p>
              Once we receive and inspect the returned product, we will notify you about the status of your refund. If approved, the refund will be processed through the original payment method within 5-7 business days.
            </p>
          </section>

          <section>
            <h2 className="text-black text-lg tracking-wider font-medium mb-4">Delivery Area</h2>
            <p>
              Please note that delivery is currently available only in <strong className="text-black font-semibold">Karachi</strong>. All deliveries and returns are handled directly by our team.
            </p>
          </section>

          <section>
            <h2 className="text-black text-lg tracking-wider font-medium mb-4">Exceptions</h2>
            <p>Refunds may not be available in the following cases:</p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-black/55">
              <li>Products returned after the 3-day window</li>
              <li>Used or opened products</li>
              <li>Products with damaged or missing packaging</li>
              <li>Products damaged by the customer</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
