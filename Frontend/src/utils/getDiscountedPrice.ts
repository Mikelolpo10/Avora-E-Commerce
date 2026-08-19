import formatRupiah from "./formatRupiah"

export default function getDiscountedPrice(price: number, discount: number): string {
  return formatRupiah(price - (price * discount) / 100)
}