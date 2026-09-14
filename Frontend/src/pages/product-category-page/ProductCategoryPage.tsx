import { useQuery } from "@tanstack/react-query";
import { useParams, Link, useSearchParams } from "react-router";
import { useState, useEffect, useMemo } from "react";

import type { Product } from "@/interfaces/product.interface";
import type { CheckedFilter } from "@/interfaces/filter.interface";
import { getProductsByDepartment } from "@/api/product";
import { useDocumentTitle } from "@/hooks/useDocumentTitles";
import { useProductFilters } from "@/hooks/useProductsFilters";
import capitalize from "@/utils/capitalize";
import { parseSearchParamsToFilters } from "@/utils/parseSearchParamsToFilters";

import Divider from 'components/common/Divider';
import ProductCard from "components/ProductCard";
import ProductCardSkeleton from "components/ProductCardSkeleton";
import NotFoundPage from "components/ErrorPage";
import Toolbar from "./Toolbar";

export default function ProductCategoryPage() {
  const { department } = useParams()
  const [openFilter, setOpenFilter] = useState<boolean>(false)
  const { filterOptions, dispatch, checkedFilters } = useProductFilters();
  const [searchParams, setSearchParams] = useSearchParams()

  const sortBy = searchParams.get("sort") || "default"

  const appliedFilters: CheckedFilter[] = useMemo(
    () => parseSearchParamsToFilters(searchParams),
    [searchParams]
  )


  const { data, isFetching, isError } = useQuery<Product[]>({
    queryKey: [department, sortBy, searchParams.toString()],
    queryFn: () => getProductsByDepartment(department!, sortBy, appliedFilters),
    enabled: !!department,
    retry: 2
  })

  useDocumentTitle(department!, 'Department not found')

  // Toggle filter display
  useEffect(() => {
    document.body.style.overflow = openFilter ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [openFilter]);

  if (!department || isError) return <NotFoundPage />

  return (
    <>
      <div className="relative mt-16 px-32 flex flex-col">
        <h1 className="mt-16 mb-4 text-2xl font-medium">{capitalize(department)}'s Collection</h1>

        <Divider />

        <Toolbar
          openFilter={openFilter}
          setOpenFilter={setOpenFilter}
          filterOptions={filterOptions}
          dispatch={dispatch}
          setSearchParams={setSearchParams}
          checkedFilters={checkedFilters}
        />

        <div className="mb-8 grid grid-cols-4 auto-rows-84 gap-y-16">
          {isFetching ? (
            Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          ) : (
            data!.map(({ id, name, slug, department, image_url, variants }) => (
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


