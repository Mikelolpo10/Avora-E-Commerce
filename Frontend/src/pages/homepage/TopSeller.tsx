import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/ProductCard";
import { getTrendingProducts } from "@/api/product";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";


export default function TopSeller() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['trending'],
    queryFn: () => getTrendingProducts(),
    retry: 3
  })

  if (isError) return <h1>Something went wrongx</h1>

  return (
    <section className="my-8 flex flex-col items-center justify-center bg-gray">
      <h2 className="pb-4 text-primary-black text-3xl font-bold uppercase">best seller</h2>
      <span className="text-black/75 text-sm uppercase">Our most-loved essentials, chosen by thousands.</span>
      <div className="mt-8 mb-16 px-30 grid w-full grid-cols-4">
        {isLoading ?
          <ProductCardSkeleton />
          :
          data!.map(({ id, name, slug, department, image_url, variants, average_rating, reviews_count }) => (
            <ProductCard
              key={id}
              name={name}
              slug={slug}
              department={department}
              image_url={image_url}
              variants={variants}
              average_rating={average_rating}
              reviews_count={reviews_count}
              showRating={true}
              lazy={true}
            />
          ))

        }
      </div>
    </section>
  )
}