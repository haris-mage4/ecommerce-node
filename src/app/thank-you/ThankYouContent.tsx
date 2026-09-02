'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CartItem } from '@/lib/cart';
import { CustomerInfo, formatPrice } from '@/lib/whatsapp';
import { siteConfig } from '@/lib/config';

interface OrderData {
  items: CartItem[];
  customer: CustomerInfo;
  total: number;
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-10 h-10"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

export default function ThankYouContent() {
  const searchParams = useSearchParams();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    const encoded = searchParams.get('order');
    if (encoded) {
      try {
        const decoded = decodeURIComponent(escape(atob(encoded)));
        const data: OrderData = JSON.parse(decoded);
        setOrder(data);
      } catch {
        // silently fail – order param was malformed
      }
    }
    // Generate a friendly order reference
    const ref = `NE-${Date.now().toString(36).toUpperCase()}`;
    setOrderNumber(ref);
  }, [searchParams]);

  const handlePrint = () => {
    window.print();
  };

  const orderDate = new Date().toLocaleDateString('en-PK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      {/* ─── Print Styles ─── */}
      <style>{`
        @media print {
          body { background: #fff !important; color: #000 !important; }
          .no-print { display: none !important; }
          .print-container { box-shadow: none !important; border: 1px solid #ddd !important; }
        }
      `}</style>

      <div className="pt-28 pb-20 px-6 lg:px-8 max-w-3xl mx-auto">
        {/* ── Success Banner ── */}
        <div className="text-center mb-12 no-print">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-50 border border-green-200 text-green-600 mb-6">
            <CheckIcon />
          </div>
          <p className="text-black/50 text-xs tracking-[0.3em] uppercase mb-3">Order Received</p>
          <h1 className="text-3xl md:text-4xl font-light tracking-wider text-black mb-3">
            Thank You{order ? `, ${order.customer.name.split(' ')[0]}` : ''}!
          </h1>
          <p className="text-black/55 text-sm tracking-wider">
            Your order has been sent via WhatsApp. We&apos;ll confirm it shortly.
          </p>
          <div className="w-12 h-px bg-black/20 mx-auto mt-6" />
        </div>

        {/* ── Order Receipt Card ── */}
        <div className="print-container border border-black/10 bg-white shadow-sm">
          {/* Receipt Header */}
          <div className="p-8 border-b border-black/10 flex items-start justify-between">
            <div>
              <p className="text-black font-semibold tracking-[0.25em] uppercase text-lg">
                {siteConfig.name}
              </p>
              <p className="text-black/40 text-xs tracking-wider mt-1">{siteConfig.address}</p>
              <p className="text-black/40 text-xs tracking-wider">{siteConfig.phone}</p>
            </div>
            <div className="text-right">
              <p className="text-black/40 text-[10px] tracking-[0.2em] uppercase">Order Ref</p>
              <p className="text-black font-mono text-sm tracking-wider mt-1">{orderNumber}</p>
              <p className="text-black/40 text-xs mt-1">{orderDate}</p>
            </div>
          </div>

          {/* Customer Details */}
          {order && (
            <div className="p-8 border-b border-black/10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-black/40 mb-3">
                  Customer
                </p>
                <p className="text-black text-sm tracking-wider font-medium">{order.customer.name}</p>
                <p className="text-black/55 text-sm tracking-wider mt-1">{order.customer.phone}</p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-black/40 mb-3">
                  Delivery Address
                </p>
                <p className="text-black/70 text-sm tracking-wider">{order.customer.area}</p>
                <p className="text-black/70 text-sm tracking-wider mt-1">{order.customer.address}</p>
                {order.customer.notes && (
                  <p className="text-black/40 text-xs tracking-wider mt-2 italic">
                    Note: {order.customer.notes}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Order Items */}
          {order && (
            <div className="p-8 border-b border-black/10">
              <p className="text-[10px] tracking-[0.25em] uppercase text-black/40 mb-6">
                Items Ordered
              </p>
              <div className="space-y-5">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-black text-sm tracking-wider font-medium">{item.name}</p>
                      <p className="text-black/40 text-xs tracking-wider uppercase mt-0.5">
                        {item.size} · Qty {item.quantity}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-black text-sm tracking-wider font-semibold">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-black/35 text-xs mt-0.5">
                          {formatPrice(item.price)} each
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Totals */}
          {order && (
            <div className="p-8 border-b border-black/10">
              <div className="space-y-3">
                <div className="flex justify-between text-sm tracking-wider">
                  <span className="text-black/50">Subtotal</span>
                  <span className="text-black font-medium">{formatPrice(order.total)}</span>
                </div>
                <div className="flex justify-between text-sm tracking-wider">
                  <span className="text-black/50">Delivery</span>
                  <span className="text-black/50 italic text-xs">To be confirmed</span>
                </div>
                <div className="h-px bg-black/10 my-2" />
                <div className="flex justify-between">
                  <span className="text-black text-sm tracking-wider font-semibold">
                    Order Total
                  </span>
                  <span className="text-black text-xl tracking-wider font-semibold">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* WhatsApp Status Note */}
          <div className="p-8 bg-green-50/60 border-b border-black/10">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <p className="text-black text-sm tracking-wider font-medium">Order sent via WhatsApp</p>
                <p className="text-black/55 text-xs tracking-wider mt-1">
                  Our team will contact you on{' '}
                  <span className="font-medium text-black/70">
                    {order?.customer.phone ?? 'your number'}
                  </span>{' '}
                  to confirm your order and delivery charges.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="p-6 text-center">
            <p className="text-black/35 text-[11px] tracking-wider">
              Thank you for shopping with {siteConfig.name}. This is not a tax invoice.
            </p>
          </div>
        </div>

        {/* ── Action Buttons ── */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 no-print">
          <button
            id="print-receipt-btn"
            onClick={handlePrint}
            className="flex-1 border border-black/30 text-black text-xs tracking-[0.2em] uppercase px-6 py-3.5 hover:bg-black hover:text-white transition-all duration-500 flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.056 48.056 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"
              />
            </svg>
            Print Receipt
          </button>
          <Link
            href="/shop"
            id="continue-shopping-btn"
            className="flex-1 bg-black text-white text-xs tracking-[0.2em] uppercase px-6 py-3.5 hover:bg-black/80 transition-all duration-500 text-center"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </>
  );
}
