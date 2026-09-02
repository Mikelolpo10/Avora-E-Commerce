import { ArrowLeft, ArrowRight, Star, ThumbsUp } from "lucide-react"
import { useParams, Link } from "react-router"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

import { API_URL } from "@/config/env"
import type { Product } from "@/interfaces/product.interface"
import { getProductBySlug, getSimilarProducts } from "@/api/product"
import ProductDetails from "./ProductDetails"
import SimilarProducts from "./SimilarProducts"
import Divider from "components/common/Divider"
import SortButton from "components/common/SortButton"
import ErrorPage from "components/ErrorPage"
import ProductPageSkeleton from "./ProductPageSkeleton"
import capitalize from "@/utils/capitalize"

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

  const sortOptions = [
    {
      name: 'Most Recent',
      value: 'most-recent',
    },
    {
      name: 'Highest Rating',
      value: 'highest-rating',
    },
    {
      name: 'Lowest Rating',
      value: 'lowest-rating',
    },
  ]

  if (isError || similarError) return <ErrorPage text="The product you're looking for may have been removed or is no longer available." />

  if (isPending) return <ProductPageSkeleton />

  return (
    <div className="mt-16 px-24 flex flex-col bg-gray">
      <div className="pt-8 flex">
        <div className="flex flex-col w-180 ">
          <section className="flex h-148">
            <div className="mr-4 flex h-148 w-40 flex-col gap-4">
              {[1, 2, 3, 4].map((item, index) => (
                <div
                  key={index}
                  className={`${activeImg === item && 'border-2 border-ash'} flex flex-1 min-w-0 min-h-0 justify-center bg-gray-dark cursor-pointer select-none`}
                  onClick={() => setActiveImg(item)}
                >
                  <img
                    src={`${API_URL}${data.image_url}-${item}.webp`}
                    alt={`${data.image_url}-${item}`}
                    fetchPriority="high"
                    // width={80}
                    // height={80}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
            <div className="group relative flex w-148 h-148 justify-center bg-gray-dark overflow-hidden">
              <img
                src={`${API_URL}${data?.image_url}-${activeImg}.webp`}
                alt="Thumbnail"
                width={1000}
                height={1000}
                className="w-full h-full object-contain select-none"
              />

              <div
                onClick={() => setActiveImg(activeImg === 1 ? 4 : activeImg - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 flex aspect-square w-12 cursor-pointer items-center justify-center rounded-full bg-white shadow opacity-0 transition-opacity group-hover:opacity-100"
              >
                <ArrowLeft />
              </div>

              <div
                onClick={() => setActiveImg(activeImg === 4 ? 1 : activeImg + 1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex aspect-square w-12 cursor-pointer items-center justify-center rounded-full bg-white shadow opacity-0 transition-opacity group-hover:opacity-100"
              >
                <ArrowRight />
              </div>
            </div>
          </section>

          {/* REVIEWS */}
          <section className="mt-12 flex flex-col items-center">
            <div className="py-4 flex flex-col items-start w-full">
              <div className="flex justify-between w-full">
                <h2 className="mb-2 text-primary-black text-2xl font-medium text-shadow-2xs">Reviews</h2>
                <SortButton sortOptions={sortOptions} />
              </div>
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
            </div>

            <div className="flex flex-col">
              <Divider color="ash" />
              {[1, 2, 3].map((i) => (
                <div key={i} className="py-4 flex h-80 flex-col gap-4">
                  <div className="flex justify-between text-lg">
                    <h2>Very good</h2>
                    <span className="text-ash text-sm">18/09/2025</span>
                  </div>
                  <div className="flex items-start">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} fill="primary" size={18} strokeWidth={0} />
                    ))}
                  </div>
                  <div>
                    <p>Size Purchased: XL</p>
                    <p>Color Purchased: Black</p>
                  </div>
                  <p className="text-[15px]">
                    It feels like wearing nothing at all, yet provides the perfect gentle support. The fabric is impossibly soft against the skin. A true revelation in daily wear.
                  </p>
                  <div className="mt-auto flex w-full items-center justify-between">
                    <span className="text-ash text-sm font-medium">Timoty {'\u00B7'} Men</span>
                    <div className="px-4 py-2 flex items-center gap-2 border border-gray-dark rounded-3xl text-sm cursor-pointer select-none">
                      <ThumbsUp size={18} />
                      Helpfull 0
                    </div>
                  </div>
                  <Divider color="ash" />
                </div>
              ))}
            </div>
          </section>
        </div>

        <ProductDetails data={data} />
      </div>


      <SimilarProducts products={similarProducts} similarPending={similarPending} />

      <div className="mb-4 text-sm">
        <Link to='/' className="text-blue-500 hover:underline">Home </Link>
        /<Link to={`/department/${data.department}`} className="text-blue-500 hover:underline"> {capitalize(data.department)} </Link>
        /<span> {capitalize(data.name)}</span>
      </div>
    </div>
  )
}


