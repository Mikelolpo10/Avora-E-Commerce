import { Star } from "lucide-react";
import { Link } from "react-router"
import { API_URL } from "@/config/env";
import formatRupiah from "@/utils/formatRupiah";

interface ProductProps {
  name: string;
  slug: string;
  image_url: string;
  price: number;
  lazy: boolean;
}

export default function ProductCard({ name, slug, image_url, price, lazy }: ProductProps) {
  return (
    <Link
      to={`/products/${slug}`}
      className="max-h-120 flex flex-col"
    >
      <div className="relative flex min-h-[60%] items-center justify-center overflow-hidden bg-[#f0f0f0]">
        <img
          loading={lazy ? 'lazy' : 'eager'}
          src={`${API_URL}${image_url}-1.webp`}
          alt={name}
          className="h-full transition-all duration-200 hover:scale-105 hover:brightness-90"
        />
      </div>

      <div className="pt-3 flex flex-col gap-0.5">
        <h4 className="truncate">{name}</h4>
        <div className="flex text-[15px] font-semibold">
          <span className="text-lg tracking-tighter">{formatRupiah(price)}</span>
        </div>
        <div className="flex gap-0.5 text-xs">
          <Star fill="primary" stroke="" size={16} />
          <span className="text-primary-black font-normal tracking-tighter"><strong className="text-black font-semibold">4.7</strong> (412)</span>
        </div>
      </div>
    </Link>
  )
}