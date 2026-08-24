import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router";
import { useState, useEffect } from "react";

import type { Product } from "@/interfaces/product.interface";
import Divider from 'components/common/Divider';
import { getProductsByDepartment } from "@/api/product";
import capitalize from "@/utils/capitalize";

import Toolbar from "./Toolbar";
import ProductCard from "components/ProductCard";
import ProductCardSkeleton from "components/ProductCardSkeleton";
import NotFoundPage from "../../components/ErrorPage";

export default function ProductCategoryPage() {
  const { department } = useParams()
  const [openFilter, setOpenFilter] = useState<boolean>(false)
  const { data, isPending, isError } = useQuery<Product[]>({
    queryKey: [department],
    queryFn: () => getProductsByDepartment(department!),
    enabled: !!department,
  })

  useEffect(() => {
    if (!department) {
      document.title = "Department not found";
    } else {
      document.title = `${capitalize(department)}'s Collection | AVORA`;
    }
  }, [department]);

  useEffect(() => {
    document.body.style.overflow = openFilter ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [openFilter]);

  if (!department) return <NotFoundPage />

  if (isError) return <p>Failed to load products.</p>;

  return (
    <>
      <div className="relative mt-16 px-24 flex flex-col">
        <h1 className="mt-16 mb-4 text-2xl font-medium">{capitalize(department)}'s Collection</h1>

        <Divider />

        <Toolbar openFilter={openFilter} setOpenFilter={setOpenFilter} />

        <div className="mb-8 grid grid-cols-4 auto-rows-96 gap-y-8">
          {isPending ? (
            Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          ) : (
            data.map(({ id, name, slug, image_url, price }) => (
              <ProductCard
                key={id}
                name={name}
                slug={slug}
                image_url={image_url}
                price={price}
                lazy={false}
              />
            ))
          )}
        </div>

        <small className="mb-2"><Link to={'/'}>Home</Link> / <Link to={`/department/${department}`} className="text-blue-500">{capitalize(department)}</Link></small>
      </div>
    </>
  )
}


