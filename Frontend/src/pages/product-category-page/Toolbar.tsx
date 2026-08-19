import { type Dispatch, type SetStateAction, useState, useRef } from "react";
import SortDropdown from "./SortDropdown";
import FilterModal from "./FilterModal";
import useCloseRef from "../../hooks/useCloseRef";

interface ToolbarProps {
  openFilter: boolean;
  setOpenFilter: Dispatch<SetStateAction<boolean>>;
}

export default function Toolbar({ openFilter, setOpenFilter }: ToolbarProps) {
  const sortRef = useRef<HTMLDivElement>(null)
  const [openSort, setOpenSort] = useState<boolean>(false)

  useCloseRef({
    ref: sortRef,
    setter: setOpenSort
  })

  return (
    <div className="my-4 flex items-center font-medium">
      <span className="mr-auto text-gray-800 text-sm">1234 Results</span>

      <div
        onClick={() => setOpenSort(!openSort)}
        ref={sortRef}
        className="relative mr-4 flex items-center gap-1 cursor-pointer select-none hover:underline hover:underline-offset-2"
      >
        <SortDropdown openSort={openSort} />
      </div>

      <FilterModal openFilter={openFilter} setOpenFilter={setOpenFilter} />
    </div>
  )
}