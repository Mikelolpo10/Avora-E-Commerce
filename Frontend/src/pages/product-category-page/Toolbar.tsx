import { type Dispatch, type SetStateAction } from "react";
import FilterModal from "./FilterModal";
import SortButton from "@/components/common/SortButton";

interface ToolbarProps {
  openFilter: boolean;
  setOpenFilter: Dispatch<SetStateAction<boolean>>;
}

export default function Toolbar({ openFilter, setOpenFilter }: ToolbarProps) {
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

      <FilterModal openFilter={openFilter} setOpenFilter={setOpenFilter} />
    </div>
  )
}