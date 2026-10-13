import { Heart, Star } from "lucide-react";
import { Link } from "react-router"
import { API_URL } from "@/config/env";
import formatRupiah from "@/utils/formatRupiah";
import type { ProductCardProps } from "@/interfaces/product.interface";
import capitalize from "@/utils/capitalize";

export default function ProductCard({ name, slug, department, image_url, lazy, variants, average_rating, reviews_count, showRating = false }: ProductCardProps) {
  const SIZE_ORDER = ['S', 'M', 'L', 'XL', 'XXL'];

  function getSizeRange(variants: { size: string }[]) {
    const uniqueSizes = SIZE_ORDER.filter(size =>
      variants.some(v => v.size === size)
    );

    if (uniqueSizes.length === 0) return '';
    if (uniqueSizes.length === 1) return uniqueSizes[0];

    return `${uniqueSizes[0]}-${uniqueSizes[uniqueSizes.length - 1]}`;
  }

  return (
    <Link
      to={`/products/${slug}`}
      className="group flex h-100 flex-col"
    >
      <div className="relative flex min-h-[60%] items-center justify-center overflow-hidden bg-gray-dark">
        <img
          loading={lazy ? 'lazy' : 'eager'}
          src={`${API_URL}${image_url}-1.webp`}
          alt={name}
          className="h-full object-contain transition-all duration-200 group-hover:scale-105 group-hover:brightness-90"
        />
      </div>

      <div className="pt-3 flex flex-col gap-0.5">
        <div className="pr-8 flex justify-between">
          <span>{capitalize(department)}, {getSizeRange(variants)}</span>
          {/* Tambah fitur masuk wishlist */}
          <Heart size={20} />
        </div>
        <h4 className="truncate">{name}</h4>
        <div className="mt-1 mb-1 flex text-[15px] font-semibold">
          <span className="text-lg tracking-tighter">{formatRupiah(variants[0].price)}</span>
        </div>

        {showRating ?
          <div className="flex gap-0.5 text-xs">
            <Star fill="primary" stroke="" size={16} />
            <span className="text-primary-black font-normal tracking-tighter"><strong className="text-black font-semibold">{Number(average_rating ?? 0).toFixed(1)}</strong> ({reviews_count})</span>
          </div>
          : ''
        }
      </div>
    </Link>
  )
}