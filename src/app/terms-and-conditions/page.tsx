import { Metadata } from 'next';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: `Terms and Conditions for ${siteConfig.name}`,
};

export default function TermsPage() {
  return (
    <div className="pt-28 pb-20 px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-4">Legal</p>
          <h1 className="text-3xl md:text-4xl font-light tracking-wider text-white">Terms &amp; Conditions</h1>
          <div className="w-12 h-px bg-white/20 mx-auto mt-6" />
        </div>

        <div className="space-y-10 text-white/50 text-sm leading-relaxed">
          <section>
            <h2 className="text-white text-lg tracking-wider font-light mb-4">General</h2>
            <p>
              By accessing and using the {siteConfig.name} website, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our website.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg tracking-wider font-light mb-4">Products</h2>
            <p>
              All products displayed on our website are subject to availability. We reserve the right to discontinue any product at any time. Product images are for illustration purposes and may vary slightly from the actual product.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg tracking-wider font-light mb-4">Pricing</h2>
            <p>
              All prices are listed in Pakistani Rupees (PKR) and are inclusive of applicable taxes. We reserve the right to change prices at any time without prior notice. The price at the time of order confirmation via WhatsApp is the price you will be charged.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg tracking-wider font-light mb-4">Orders</h2>
            <p>
              Orders are placed through WhatsApp and are confirmed once acknowledged by our team. We reserve the right to refuse or cancel any order for any reason, including product availability or suspected fraudulent activity.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg tracking-wider font-light mb-4">Delivery</h2>
            <p>
              We currently deliver within Karachi only. Delivery charges and estimated delivery times will be communicated at the time of order confirmation. We are not responsible for delays caused by circumstances beyond our control.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg tracking-wider font-light mb-4">Payment</h2>
            <p>
              Payment methods and terms will be communicated during the WhatsApp order process. Payment details are never collected through this website.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg tracking-wider font-light mb-4">Contact</h2>
            <p>
              For any questions regarding these Terms &amp; Conditions, please contact us at{' '}
              <a href={`mailto:${siteConfig.email}`} className="text-white/70 hover:text-white underline transition-colors">
                {siteConfig.email}
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
