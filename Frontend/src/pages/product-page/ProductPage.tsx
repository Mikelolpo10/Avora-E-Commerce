import { ArrowLeft, ArrowRight, Star } from "lucide-react"
import { useParams } from "react-router"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

import ProductDetails from "./ProductDetails"
import SimilarProducts from "./SimilarProducts"
import Divider from "../../components/common/Divider"
import { type Product } from "../../interfaces/product.interface"
import { API_URL } from "../../config/env"
import { getProductBySlug, getSimilarProducts } from "../../api/product"
import ProductPageSkeleton from "./ProductPageSkeleton"

export default function ProductPage() {
  const { productSlug } = useParams()
  const [activeImg, setActiveImg] = useState<number>(1)
  const { data, isPending, isError } = useQuery<Product>({
    queryKey: ['product', productSlug],
    queryFn: () => getProductBySlug(productSlug!),
    enabled: !!productSlug,
  })
  const { data: similarProducts, isPending: similarPending, isError: similarError } = useQuery<Product[]>({
    queryKey: ['similar products', productSlug],
    queryFn: () => getSimilarProducts(productSlug!),
    enabled: !!productSlug,
  })

  if (isError || similarError) return <h1>Data error</h1>

  if (isPending) return <ProductPageSkeleton />
  
  return (
    <div className="mt-16 px-24 flex flex-col bg-gray">
      <div className="pt-8 flex w-full">
        <div className="flex w-160 h-124">
          <div className="flex flex-col w-40 gap-4">
            {[1, 2, 3, 4].map((item, index) => (
              <div
                key={index}
                className={`${activeImg === item && 'border-2 border-ash'} select-none flex items-center bg-gray-dark w-28 h-28 rounded-xl cursor-pointer`}
                onClick={() => setActiveImg(item)}
              >
                <img
                  src={`${API_URL}${data.image_url}-${item}.png`}
                  alt={`${data.image_url}-${item}`}
                />
              </div>
            ))}
          </div>
          <div className="group relative flex w-full bg-gray-dark rounded-2xl">
            <img
              src={`${API_URL}${data?.image_url}-${activeImg}.png`}
              alt="Thumbnail"
              className="w-full select-none"
            />
            <div
              onClick={() => setActiveImg(activeImg === 1 ? 4 : activeImg - 1)}
              className="absolute left-4 top-[50%] group-hover:opacity-100 opacity-0 flex items-center justify-center w-12 bg-white rounded-full aspect-square shadow translate-y-[-50%] transition-opacity cursor-pointer"
            >
              <ArrowLeft />
            </div>
            <div
              onClick={() => setActiveImg(activeImg === 4 ? 1 : activeImg + 1)}
              className="absolute right-4 top-[50%] group-hover:opacity-100 opacity-0 flex items-center justify-center w-12 bg-white rounded-full aspect-square shadow translate-y-[-50%] transition-opacity cursor-pointer"
            >
              <ArrowRight />
            </div>
          </div>
        </div>
        
        <ProductDetails data={data} />
      </div>

      <SimilarProducts products={similarProducts} similarPending={similarPending} />

      {/* Mungkin hapus? */}
      <Divider />

      <section className="flex flex-col items-center">
        <div className="py-12 flex flex-col items-center">
          <h2 className="mb-2 text-primary-black text-3xl font-bold text-shadow-2xs">Customer Experience</h2>
          <span>Discover the luxury of our essentials through the voices of our customers</span>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {[1, 2, 3].map(() => (
            <div className="py-8 px-12 flex h-80 flex-col items-center gap-6 bg-white shadow-md">
              <div className="flex w-full items-start">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} fill="primary" size={20} strokeWidth={0} />
                ))}
              </div>
              <p className="italic text-lg">
                "It feels like wearing nothing at all, yet provides the perfect gentle support. The fabric is impossibly soft against the skin. A true revelation in daily wear."
              </p>
              <div className="mt-auto flex w-full justify-between text-sm">
                <span className="text-black font-semibold">Timoty</span>
                <span className="text-black font-medium italic">Tokopedia</span>
              </div>
            </div>
          ))}
        </div>

        <div className="my-12 py-3 px-6 border border-primary-black bg-primary text-white text-sm font-medium shadow-2xl cursor-pointer">
          Read More Reviews
        </div>
      </section>
    </div>
  )
}


