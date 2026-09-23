import { Link } from "react-router";
import { useState } from "react";
import Countdown from "./common/Countdown";
import formatRupiah from "../utils/formatRupiah";
import getDiscountedPrice from "../utils/getDiscountedPrice";
import type { Discount } from "../interfaces/discount.interface";
import { API_URL } from "../config/env";

interface DiscountColection {
  title: string;
  slug: string;
  products?: Discount[];
}


export default function DiscountColection({ title, slug, products }: DiscountColection) {
  const endTime: string = products?.[0]?.end_at || ''
  const [isExpired, setIsExpired] = useState<boolean>(false)

  if (isExpired || endTime == '') return null

  return (
    <div className="flex flex-col mt-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h3 className="pr-4 text-[34px] font-semibold">
            {title}
          </h3>
          <Countdown
            endTime={endTime}
            setIsExpired={setIsExpired}
          />
        </div>
        <Link to={`/${title}/${slug}`} className="flex items-center font-medium text-sm text-primary">Lihat Semua</Link>
      </div>

      <div className="pt-4 grid grid-cols-5 md:grid-cols-5 gap-2 overflow-hidden">
        {products?.slice(0, 5).map(({ promotion_product_id, name, slug, image_url, price, discount, category_name }) => (
          <Link
            key={promotion_product_id}
            to={`/products/${slug}`}
            className="pb-4 flex flex-col hover:border border-ash/50"
          >
            <div className="relative flex items-center h-72 w-full overflow-hidden">
              <img
                src={`${API_URL}${image_url}-1.webp`}
                alt={image_url}
                loading="lazy"
                className="h-full w-full bg-gray-dark transition-all duration-200 hover:scale-105 hover:brightness-90 object-contain"
              />
              <div className="absolute top-0 right-0 py-2 px-2 flex text-center w-12 bg-red-700 text-sm text-white font-semibold">{discount}% Off</div>
            </div>

            <div className="pt-3 flex flex-col">
              <span>{category_name}</span>
              <h4 className="font-medium">{name}</h4>
              <div className="pt-1 flex gap-2 text-lg font-formal">
                <span className="text-red-500 font-semibold">{getDiscountedPrice(price, discount)}</span>
                <span className="line-through text-sm">{formatRupiah(price)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}