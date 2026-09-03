import type { Product } from "../../interfaces/product.interface";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";

interface SimilarProps {
  products: Product[] | undefined
  similarPending: boolean;
}

export default function SimilarProducts({ products, similarPending }: SimilarProps) {
  return (
    <div className="flex flex-col mt-16">
      <div className="flex items-center justify-between">
        <h3 className="pr-4 text-[34px] font-semibold">
          Similar Products
        </h3>
      </div>

      <div className="mb-12 pt-8 grid grid-cols-5 md:grid-cols-6 gap-2 overflow-hidden">
        {similarPending ? (
          Array.from({ length: 6 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))
        ) : (
          products?.map(({ id, name, slug, department, image_url, price, variants }) => (
            <ProductCard
              key={id}
              name={name}
              slug={slug}
              department={department}
              image_url={image_url}
              price={price}
              variants={variants}
              lazy={true}
            />
          ))
        )}
      </div>
    </div>
  )
}