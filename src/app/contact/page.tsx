import { Metadata } from 'next';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with ${siteConfig.name}. We're available on WhatsApp for orders and inquiries.`,
};

export default function ContactPage() {
  return (
    <div className="pt-28 pb-20 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16">
          <p className="text-black/50 text-xs tracking-[0.3em] uppercase mb-4">Get in Touch</p>
          <h1 className="text-3xl md:text-5xl font-light tracking-wider text-black">Contact Us</h1>
          <div className="w-12 h-px bg-black/25 mx-auto mt-6" />
        </div>

        {/* WhatsApp CTA */}
        <div className="text-center mb-20">
          <div className="border border-black/10 bg-white p-12 max-w-lg mx-auto">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 mx-auto text-green-600 mb-6">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <h2 className="text-xl font-light tracking-wider text-black mb-3">Chat With Us on WhatsApp</h2>
            <p className="text-black/55 text-sm mb-8">
              The fastest way to reach us. Ask about fragrances, place orders, or get recommendations.
            </p>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 hover:bg-green-700 text-white text-xs tracking-[0.2em] uppercase px-10 py-3.5 transition-all duration-500"
            >
              Start Chat
            </a>
          </div>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="border border-black/10 bg-white p-8">
            <h3 className="text-black text-xs tracking-[0.2em] uppercase mb-4 font-semibold">Phone</h3>
            <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="text-black/65 hover:text-black text-lg transition-colors duration-300">
              {siteConfig.phone}
            </a>
          </div>
          <div className="border border-black/10 bg-white p-8">
            <h3 className="text-black text-xs tracking-[0.2em] uppercase mb-4 font-semibold">Email</h3>
            <a href={`mailto:${siteConfig.email}`} className="text-black/65 hover:text-black text-lg transition-colors duration-300">
              {siteConfig.email}
            </a>
          </div>
          <div className="border border-black/10 bg-white p-8">
            <h3 className="text-black text-xs tracking-[0.2em] uppercase mb-4 font-semibold">Instagram</h3>
            <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className="text-black/65 hover:text-black text-lg transition-colors duration-300">
              @noiressence
            </a>
          </div>
          <div className="border border-black/10 bg-white p-8">
            <h3 className="text-black text-xs tracking-[0.2em] uppercase mb-4 font-semibold">Delivery Area</h3>
            <p className="text-black/65 text-lg">Karachi, Pakistan</p>
            <p className="text-black/40 text-sm mt-2">Direct delivery by our team</p>
          </div>
        </div>

        {/* Delivery Note */}
        <div className="text-center border border-black/10 p-12 bg-[#eceae4]">
          <h3 className="text-black text-lg tracking-wider font-medium mb-4">Delivery Information</h3>
          <p className="text-black/60 text-sm leading-relaxed max-w-xl mx-auto">
            We currently deliver across Karachi. All deliveries are handled personally by our team to ensure your fragrance arrives in perfect condition. Delivery charges and timelines will be confirmed when you place your order via WhatsApp.
          </p>
        </div>
      </div>
    </div>
  );
}
