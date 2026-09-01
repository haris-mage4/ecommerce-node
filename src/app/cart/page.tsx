'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatPrice, generateWhatsAppMessage, getWhatsAppUrl, CustomerInfo } from '@/lib/whatsapp';
import QuantitySelector from '@/components/QuantitySelector';

export default function CartPage() {
  const { items, removeItem, updateItemQuantity, total, clearAllItems } = useCart();
  const [customer, setCustomer] = useState<CustomerInfo>({
    name: '',
    phone: '',
    area: '',
    address: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validatePhone = (phone: string): string => {
    const digits = phone.replace(/\D/g, '');
    if (!digits) return 'Phone number is required';
    if (digits.length !== 11) return 'Phone number must be 11 digits (e.g. 03XX XXXXXXX)';
    if (!digits.startsWith('03')) return 'Phone number must start with 03';
    return '';
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!customer.name.trim()) newErrors.name = 'Name is required';
    const phoneError = validatePhone(customer.phone);
    if (phoneError) newErrors.phone = phoneError;
    if (!customer.area.trim()) newErrors.area = 'Area is required';
    if (!customer.address.trim()) newErrors.address = 'Address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOrder = () => {
    if (items.length === 0) return;
    if (!validate()) return;

    const message = generateWhatsAppMessage(items, customer);
    const url = getWhatsAppUrl(message);
    window.open(url, '_blank');
  };

  if (items.length === 0) {
    return (
      <div className="pt-28 pb-20 px-6 lg:px-8 max-w-3xl mx-auto text-center">
        <div className="py-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={0.5}
            stroke="currentColor"
            className="w-20 h-20 mx-auto text-white/15 mb-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <h1 className="text-2xl font-light tracking-wider text-white mb-4">Your Order Bag is Empty</h1>
          <p className="text-white/40 text-sm mb-8">Discover our collection of premium fragrances</p>
          <Link
            href="/shop"
            className="inline-block border border-white/30 text-white text-xs tracking-[0.2em] uppercase px-10 py-3.5 hover:bg-white hover:text-black transition-all duration-500"
          >
            Shop Fragrances
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="text-center mb-12">
        <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-4">Your Selection</p>
        <h1 className="text-3xl md:text-4xl font-light tracking-wider text-white">Order Bag</h1>
        <div className="w-12 h-px bg-white/20 mx-auto mt-6" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-3 space-y-6">
          {items.map((item) => (
            <div
              key={item.productId}
              className="border border-white/10 p-6 flex gap-6"
            >
              {/* Image placeholder */}
              <Link href={`/product/${item.slug}`} className="flex-shrink-0 w-24 h-32 bg-neutral-900 border border-white/5 flex items-center justify-center">
                <span className="text-white/20 text-[10px] tracking-wider">IMG</span>
              </Link>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <Link href={`/product/${item.slug}`} className="text-white text-base tracking-wider font-light hover:text-white/70 transition-colors">
                      {item.name}
                    </Link>
                    <p className="text-white/30 text-[11px] tracking-wider uppercase mt-1">{item.size}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="text-white/20 hover:text-white/60 transition-colors duration-300"
                    aria-label={`Remove ${item.name}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <QuantitySelector
                    quantity={item.quantity}
                    onIncrease={() => updateItemQuantity(item.productId, item.quantity + 1)}
                    onDecrease={() => updateItemQuantity(item.productId, item.quantity - 1)}
                  />
                  <div className="text-right">
                    <p className="text-white tracking-wider">{formatPrice(item.price * item.quantity)}</p>
                    {item.quantity > 1 && (
                      <p className="text-white/30 text-xs mt-1">{formatPrice(item.price)} each</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Clear cart */}
          <div className="text-right">
            <button
              onClick={clearAllItems}
              className="text-white/20 hover:text-white/50 text-xs tracking-wider uppercase transition-colors duration-300"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Order Summary & Customer Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Subtotal */}
          <div className="border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <span className="text-white/40 text-sm tracking-wider">Subtotal</span>
              <span className="text-white text-xl tracking-wider">{formatPrice(total)}</span>
            </div>
            <p className="text-white/20 text-xs tracking-wider">Delivery charges will be confirmed on WhatsApp</p>
          </div>

          {/* Customer Form */}
          <div className="border border-white/10 p-6 space-y-5">
            <h3 className="text-white text-xs tracking-[0.2em] uppercase mb-4">Delivery Information</h3>

            <div>
              <input
                type="text"
                placeholder="Full Name *"
                value={customer.name}
                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                className={`w-full bg-transparent border text-white placeholder-white/30 text-sm tracking-wider px-4 py-3 focus:outline-none transition-colors duration-300 ${
                  errors.name ? 'border-red-500/50' : 'border-white/20 focus:border-white/40'
                }`}
              />
              {errors.name && <p className="text-red-400/70 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <input
                type="tel"
                placeholder="Phone Number * (e.g. 03XX XXXXXXX)"
                value={customer.phone}
                maxLength={11}
                onChange={(e) => {
                  // Allow digits only
                  const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 11);
                  setCustomer({ ...customer, phone: digitsOnly });
                  // Clear error on change if previously set
                  if (errors.phone) {
                    setErrors((prev) => ({ ...prev, phone: '' }));
                  }
                }}
                className={`w-full bg-transparent border text-white placeholder-white/30 text-sm tracking-wider px-4 py-3 focus:outline-none transition-colors duration-300 ${
                  errors.phone ? 'border-red-500/50' : 'border-white/20 focus:border-white/40'
                }`}
              />
              {errors.phone
                ? <p className="text-red-400/70 text-xs mt-1.5">{errors.phone}</p>
                : customer.phone.length > 0 && customer.phone.length < 11
                  ? <p className="text-white/30 text-xs mt-1.5">{11 - customer.phone.length} digit{11 - customer.phone.length !== 1 ? 's' : ''} remaining</p>
                  : customer.phone.length === 11 && customer.phone.startsWith('03')
                    ? <p className="text-green-400/60 text-xs mt-1.5">✓ Valid Pakistani number</p>
                    : null
              }
            </div>

            <div>
              <input
                type="text"
                placeholder="Area (e.g. DHA Phase 6) *"
                value={customer.area}
                onChange={(e) => setCustomer({ ...customer, area: e.target.value })}
                className={`w-full bg-transparent border text-white placeholder-white/30 text-sm tracking-wider px-4 py-3 focus:outline-none transition-colors duration-300 ${
                  errors.area ? 'border-red-500/50' : 'border-white/20 focus:border-white/40'
                }`}
              />
              {errors.area && <p className="text-red-400/70 text-xs mt-1">{errors.area}</p>}
            </div>

            <div>
              <textarea
                placeholder="Full Delivery Address *"
                rows={3}
                value={customer.address}
                onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                className={`w-full bg-transparent border text-white placeholder-white/30 text-sm tracking-wider px-4 py-3 focus:outline-none transition-colors duration-300 resize-none ${
                  errors.address ? 'border-red-500/50' : 'border-white/20 focus:border-white/40'
                }`}
              />
              {errors.address && <p className="text-red-400/70 text-xs mt-1">{errors.address}</p>}
            </div>

            <div>
              <textarea
                placeholder="Additional Notes (optional)"
                rows={2}
                value={customer.notes}
                onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                className="w-full bg-transparent border border-white/20 text-white placeholder-white/30 text-sm tracking-wider px-4 py-3 focus:outline-none focus:border-white/40 transition-colors duration-300 resize-none"
              />
            </div>
          </div>

          {/* WhatsApp Order Button */}
          <button
            onClick={handleOrder}
            className="w-full bg-green-700 hover:bg-green-600 text-white py-4 text-xs tracking-[0.2em] uppercase transition-all duration-500 flex items-center justify-center gap-3"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Order on WhatsApp
          </button>

          <p className="text-white/20 text-xs text-center tracking-wider">
            You will be redirected to WhatsApp to confirm your order
          </p>
        </div>
      </div>
    </div>
  );
}
