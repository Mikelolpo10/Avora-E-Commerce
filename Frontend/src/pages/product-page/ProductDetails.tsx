import { Star, StarHalf } from "lucide-react"
import formatRupiah from "../../utils/formatRupiah"
import Divider from "../../components/common/Divider"

import ColorOptions from "./ColorOptions"
import SizeOptions from "./SizeOptions"
import AddToCart from "./AddToCart"

import { type Product } from "../../interfaces/product.interface"

interface ProductDetailsProps {
  data: Product;
}


export default function ProductDetails({ data }: ProductDetailsProps) {
  return (
    <>
      <div className="pl-8 flex-1 flex flex-col gap-4">
        <h1 className="text-3xl font-bold">{data?.name}</h1>

        <div className="relative flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={18} strokeWidth={0} />
          ))}
          <div className="absolute flex">
            <Star fill="#101b2f" size={18} strokeWidth={0} />
            <Star fill="#101b2f" size={18} strokeWidth={0} />
            <Star fill="#101b2f" size={18} strokeWidth={0} />
            <Star fill="#101b2f" size={18} strokeWidth={0} />
            <StarHalf fill="#101b2f" size={18} strokeWidth={0} />
          </div>
        </div>

        <span className="text-black/80 text-xl font-medium">{formatRupiah(data?.price)}</span>

        <Divider />

        <ColorOptions />

        <SizeOptions />

        <AddToCart />

        <h2 className="mt-4 text-xl font-semibold">Description</h2>
        <div className="flex flex-col gap-4 text-primary-black">
          <p>{data.description}</p>
          <span>Material: {data.material}</span>
        </div>
      </div>
    </>
  )
}