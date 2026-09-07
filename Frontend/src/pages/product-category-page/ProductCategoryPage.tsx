import { useQuery } from "@tanstack/react-query";
import { useParams, Link, useSearchParams } from "react-router";
import { useState, useEffect } from "react";

import type { Product } from "@/interfaces/product.interface";
import Divider from 'components/common/Divider';
import { getProductsByDepartment } from "@/api/product";
import capitalize from "@/utils/capitalize";

import ProductCard from "components/ProductCard";
import ProductCardSkeleton from "components/ProductCardSkeleton";
import NotFoundPage from "components/ErrorPage";
import Toolbar from "./Toolbar";

export default function ProductCategoryPage() {
  const { department } = useParams()
  const [openFilter, setOpenFilter] = useState<boolean>(false)

  const [searchParams] = useSearchParams()
  const sortBy = searchParams.get("sort") || "default"
  const { data, isPending, isError } = useQuery<Product[]>({
    queryKey: [department, sortBy],
    queryFn: () => getProductsByDepartment(department!, sortBy),
    enabled: !!department,
    retry: 2
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

  if (!department || isError) return <NotFoundPage />

  // if (isError) return <p>Failed to load products.</p>;

  return (
    <>
      <div className="relative mt-16 px-32 flex flex-col">
        <h1 className="mt-16 mb-4 text-2xl font-medium">{capitalize(department)}'s Collection</h1>

        <Divider />

        <Toolbar openFilter={openFilter} setOpenFilter={setOpenFilter} />

        <div className="mb-8 grid grid-cols-4 auto-rows-84 gap-y-16">
          {isPending ? (
            Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          ) : (
            data.map(({ id, name, slug, department, image_url, variants }) => (
              <ProductCard
                key={id}
                name={name}
                slug={slug}
                department={department}
                variants={variants}
                image_url={image_url}
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


