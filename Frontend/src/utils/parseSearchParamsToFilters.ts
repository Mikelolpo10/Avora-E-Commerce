import type { CheckedFilter } from "@/interfaces/filter.interface";

export function parseSearchParamsToFilters(searchParams: URLSearchParams): CheckedFilter[] {
  const filters: CheckedFilter[] = [];

  const price = searchParams.get("price");
  if (price) {
    const [min, max] = price.split("-");
    filters.push({ filter: "price", value: { min, max } });
  }

  ["category", "material", "size"].forEach((key) => {
    const raw = searchParams.get(key);
    if (raw) {
      raw.split(",").forEach((value) => {
        filters.push({ filter: key, value });
      });
    }
  });

  return filters;
}