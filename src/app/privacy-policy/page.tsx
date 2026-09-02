import { Metadata } from 'next';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy Policy for ${siteConfig.name}`,
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-28 pb-20 px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-black/50 text-xs tracking-[0.3em] uppercase mb-4">Legal</p>
          <h1 className="text-3xl md:text-4xl font-light tracking-wider text-black">Privacy Policy</h1>
          <div className="w-12 h-px bg-black/25 mx-auto mt-6" />
        </div>

        <div className="space-y-10 text-black/65 text-sm leading-relaxed">
          <section>
            <h2 className="text-black text-lg tracking-wider font-medium mb-4">Information We Collect</h2>
            <p>When you place an order through WhatsApp, we collect the following information:</p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-black/55">
              <li>Your name</li>
              <li>Phone number</li>
              <li>Delivery address</li>
              <li>Order details</li>
            </ul>
          </section>

          <section>
            <h2 className="text-black text-lg tracking-wider font-medium mb-4">How We Use Your Information</h2>
            <p>We use your personal information solely for the purpose of:</p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-black/55">
              <li>Processing and delivering your orders</li>
              <li>Communicating with you about your orders</li>
              <li>Providing customer support</li>
              <li>Improving our products and services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-black text-lg tracking-wider font-medium mb-4">Data Protection</h2>
            <p>
              We take the security of your personal information seriously. Your data is never sold or shared with third parties for marketing purposes. We only share your information with delivery partners as necessary to fulfill your order.
            </p>
          </section>

          <section>
            <h2 className="text-black text-lg tracking-wider font-medium mb-4">WhatsApp Communication</h2>
            <p>
              Orders are placed through WhatsApp&apos;s click-to-chat feature. Your messages are subject to WhatsApp&apos;s own privacy policy. We do not store your WhatsApp conversations beyond what is necessary for order processing.
            </p>
          </section>

          <section>
            <h2 className="text-black text-lg tracking-wider font-medium mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href={`mailto:${siteConfig.email}`} className="text-black font-medium hover:underline transition-colors">
                {siteConfig.email}
              </a>{' '}
              or call us at {siteConfig.phone}.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
