import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatPrice(
  price: number | string,
  option: {
    currency?: "USD" | "IDR" | "JPY" | "CN";
    notation?: Intl.NumberFormatOptions["notation"];
  } = {}
) {
  const { currency = "IDR", notation = "compact" } = option;

  const numericPrice = typeof price === "string" ? parseInt(price) : price;

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency,
  }).format(numericPrice);
}
export const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};
