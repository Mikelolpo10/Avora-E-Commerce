import { useReducer, useMemo, useEffect } from "react";
import type { FilterOptions, FilterAction, CheckedFilter } from "@/interfaces/filter.interface";

const initialFilterOptions: FilterOptions[] = [
  {
    name: "Category",
    options: [
      { name: "Bra", value: "bra", checked: false },
      { name: "Sportswear", value: "sportswear", checked: false },
      { name: "Underwear", value: "underwear", checked: false },
      { name: "Night Wear", value: "night-wear", checked: false },
    ],
  },
  {
    name: "Price",
    options: [
      { name: "Any Price", value: { min: "0", max: "10000000" }, checked: true },
      { name: "Under Rp100.000", value: { min: "0", max: "100000" }, checked: false },
      { name: "Rp100.000 - Rp250.000", value: { min: "100000", max: "250000" }, checked: false },
      { name: "Rp250.000 - Rp500.000", value: { min: "250000", max: "500000" }, checked: false },
      { name: "Above Rp500.000", value: { min: "500000", max: "10000000" }, checked: false },
    ],
  },
  {
    name: "Material",
    options: [
      { name: "Cotton", value: "cotton", checked: false },
      { name: "Polyester", value: "polyester", checked: false },
      { name: "Nylon", value: "nylon", checked: false },
      { name: "Spandex", value: "spandex", checked: false },
      { name: "Lace", value: "lace", checked: false },
    ],
  },
  {
    name: "Size",
    options: [
      { name: "XS", value: "xs", checked: false },
      { name: "S", value: "s", checked: false },
      { name: "M", value: "m", checked: false },
      { name: "L", value: "l", checked: false },
      { name: "XL", value: "xl", checked: false },
      { name: "XXL", value: "xxl", checked: false },
    ],
  },
];

function changeFilter(state: FilterOptions[], action: FilterAction): FilterOptions[] {
  switch (action.type) {
    case "TOGGLE":
      if (action.groupName === 'Price') {
        return state.map((group) =>
          group.name !== action.groupName ? group : {
            ...group,
            options: group.options.map((option) => ({
              ...option,
              checked: option.value === action.value,
            })),
          })
      }

      return state.map((group) =>
        group.name !== action.groupName ? group : {
          ...group,
          options: group.options.map((opt) =>
            opt.value !== action.value
              ? opt
              : { ...opt, checked: !opt.checked }
          ),
        }
      );

    case "RESET_ALL":
      return state.map((group) =>
        group.name === 'Price' ? group : {
          ...group,
          options: group.options.map((opt) => ({ ...opt, checked: false })),
        });

    default:
      return state;
  }
}

export function useProductFilters() {
  const [filterOptions, dispatch] = useReducer(changeFilter, initialFilterOptions);

  const checkedFilters: CheckedFilter[] = useMemo(
    () =>
      filterOptions.flatMap((filter) =>
        filter.options
          .filter((option) => option.checked)
          .map((option) => ({
            filter: filter.name,
            value: option.value,
          }))
      ),
    [filterOptions]
  );

  useEffect(() => {
    console.log(filterOptions)
  }, [filterOptions])

  return { filterOptions, dispatch, checkedFilters };

  
}
  