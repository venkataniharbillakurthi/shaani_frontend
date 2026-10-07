import { formatPrice } from "../data/products";

export const WHATSAPP_NUMBER = "918639373403";

export function cartOrderMessage(items, subtotal, customer) {
  const lines = items.map(
    (item, index) =>
      `${index + 1}. ${item.title}\nSize: ${item.size}\nQuantity: ${item.qty}\nDiscount price: ${formatPrice(item.price * item.qty)}${item.originalPrice > item.price ? `\nPrice: ${formatPrice(item.originalPrice * item.qty)}` : ""}`,
  );
  const details = customer
    ? [
        `Name: ${customer.name}`,
        `Mobile: ${customer.phone}`,
        customer.email ? `Email: ${customer.email}` : "",
        `Address: ${customer.address}`,
        customer.locality ? `Locality: ${customer.locality}` : "",
        customer.landmark ? `Landmark: ${customer.landmark}` : "",
        customer.city ? `City: ${customer.city}` : "",
        customer.state ? `State: ${customer.state}` : "",
        customer.pincode ? `Pincode: ${customer.pincode}` : "",
        customer.note ? `Note: ${customer.note}` : "",
      ].filter(Boolean)
    : [];
  return [
    "Hi Shaani Clothing!",
    "",
    "I would like to place an order:",
    "",
    ...details,
    "",
    lines.join("\n\n"),
    "",
    `Discount total: ${formatPrice(subtotal)}`,
    items.some((item) => item.originalPrice > item.price)
      ? `Price total: ${formatPrice(items.reduce((total, item) => total + (item.originalPrice || item.price) * item.qty, 0))}`
      : "",
    "",
    "Please confirm availability and ordering details.",
  ].join("\n");
}

export function whatsappOrderUrl(items, subtotal, customer) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(cartOrderMessage(items, subtotal, customer))}`;
}

export function productOrderUrl(product, size, qty) {
  const items = [{ title: product.name, size, qty, price: product.price, originalPrice: product.originalPrice }];
  return whatsappOrderUrl(items, product.price * qty);
}
