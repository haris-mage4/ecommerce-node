import { siteConfig } from './config';
import { CartItem, getCartTotal } from './cart';

export interface CustomerInfo {
  name: string;
  phone: string;
  area: string;
  address: string;
  notes: string;
}

export function formatPrice(price: number): string {
  return `${siteConfig.currency} ${price.toLocaleString('en-PK')}`;
}

export function generateWhatsAppMessage(
  items: CartItem[],
  customer: CustomerInfo
): string {
  const total = getCartTotal(items);

  let message = 'Hello, I would like to place an order:\n\n';

  items.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    message += `${index + 1}. ${item.name}\n`;
    message += `   Quantity: ${item.quantity}\n`;
    message += `   Price: ${formatPrice(item.price)}\n`;
    message += `   Subtotal: ${formatPrice(subtotal)}\n\n`;
  });

  message += `Total: ${formatPrice(total)}\n\n`;
  message += `Customer Name: ${customer.name}\n`;
  message += `Phone: ${customer.phone}\n`;
  message += `Area: ${customer.area}\n`;
  message += `Address: ${customer.address}\n`;
  if (customer.notes) {
    message += `Notes: ${customer.notes}\n`;
  }
  message += '\nPlease confirm my order.';

  return message;
}

export function getWhatsAppUrl(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodedMessage}`;
}

export function getMerchantNotificationUrl(customerPhone: string): string {
  const message = `Good news! you received an order please verify ${customerPhone}`;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodedMessage}`;
}
