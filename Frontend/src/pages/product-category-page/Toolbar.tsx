import { type Dispatch, type SetStateAction } from "react";
import type { SetURLSearchParams } from "react-router";
import type { FilterOptions, FilterAction, CheckedFilter } from "@/interfaces/filter.interface";
import SortButton from "@/components/common/SortButton";
import FilterModal from "./FilterModal";

interface ToolbarProps {
  openFilter: boolean;
  setOpenFilter: Dispatch<SetStateAction<boolean>>;
  filterOptions: FilterOptions[];
  dispatch: Dispatch<FilterAction>
  setSearchParams: SetURLSearchParams;
  checkedFilters: CheckedFilter[];
}

export default function Toolbar({ openFilter, setOpenFilter, filterOptions, dispatch, setSearchParams, checkedFilters }: ToolbarProps) {
  const sortOptions = [
    {
      name: 'Best Match',
      value: 'best-match',
    },
    {
      name: 'Price: Lowest To Highest',
      value: 'price-low-high',
    },
    {
      name: 'Price: Highest To Lowest',
      value: 'price-high-low',
    },
    {
      name: 'Most Popular',
      value: 'most-popular',
    },
    {
      name: 'Highest Rating',
      value: 'highest-rating',
    },
    {
      name: 'Most Reviews',
      value: 'most-reviews',
    },
  ]

  return (
    <div className="my-4 flex items-center font-medium">
      <span className="mr-auto text-gray-800 text-sm">1234 Results</span>

      <SortButton sortOptions={sortOptions} />

      <FilterModal
        openFilter={openFilter}
        setOpenFilter={setOpenFilter}
        filterOptions={filterOptions}
        dispatch={dispatch}
        setSearchParams={setSearchParams}
        checkedFilters={checkedFilters}
      />
    </div>
  )
}