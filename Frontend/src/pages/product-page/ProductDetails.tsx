import { Star } from "lucide-react"
import formatRupiah from "../../utils/formatRupiah"
import Divider from "../../components/common/Divider"

import ColorOptions from "./ColorOptions"
import SizeOptions from "./SizeOptions"
import AddToCart from "./AddToCart"

import { type Product } from "../../interfaces/product.interface"
import DescriptionDropdown from "./DescriptionDropdown"

interface ProductDetailsProps {
  data: Product;
}


export default function ProductDetails({ data }: ProductDetailsProps) {
  return (
    <>
      <div className="pl-8 flex-1 flex flex-col gap-3">
        <h1 className="text-3xl font-bold">{data?.name}</h1>

        <div className="relative flex items-center gap-0.5">
          <div className="flex">
            <Star fill="#101b2f" size={18} strokeWidth={0} />
            <Star fill="#101b2f" size={18} strokeWidth={0} />
            <Star fill="#101b2f" size={18} strokeWidth={0} />
            <Star fill="#101b2f" size={18} strokeWidth={0} />
            <Star fill="#101b2f" size={18} strokeWidth={0} />
          </div>
          <strong className="text-lg font-semibold">4.9</strong>
          {/* Bikin bisa diklik or smtg */}
          <span className="text-blue-500 text-sm cursor-pointer">(99+)</span>
        </div>

        <span className="text-black/80 text-xl font-medium">{formatRupiah(data?.price)}</span>

        <Divider />

        <ColorOptions />

        <SizeOptions />

        <AddToCart />

        <div className="mt-4 flex flex-col gap-3">
          <DescriptionDropdown title="Care Instructions" body={data.perawatan} />
          <div className="mt-4 flex flex-col gap-4 text-black/80">
            <p>{data.description}</p>
            <p>Material: {data.material}.</p>
          </div>
        </div>
      </div>
    </>
  )
}