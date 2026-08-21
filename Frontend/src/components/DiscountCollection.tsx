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
    <div className="flex flex-col mt-16">
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

      <div className="pt-8 grid grid-cols-5 md:grid-cols-6 gap-2 overflow-hidden">
        {products?.slice(0, 6).map(({ promotion_product_id, name, slug, image_url, price, discount }) => (
          <Link
            key={promotion_product_id}
            to={`/products/${slug}`}
            className="flex flex-col items-center hover:border"
          >
            <div className="relative flex items-center overflow-hidden">
              <img src={`${API_URL}${image_url}-1.png`} alt={image_url} className="bg-gray-dark transition-all duration-200 hover:scale-105 hover:brightness-90" />
              <div className="absolute top-0 right-0 py-2 px-2 flex text-center w-12 bg-red-700 text-sm text-white font-semibold">{discount}% Off</div>
            </div>

            <div className="pt-3 flex flex-col items-center">
              <h4 className="text-lg font-semibold truncate">{name}</h4>
              <div className="pt-1 flex gap-2 text-[15px] ">
                <span className="line-through text-ash">{formatRupiah(price)}</span>
                <span className="text-red-500">{getDiscountedPrice(price, discount)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}