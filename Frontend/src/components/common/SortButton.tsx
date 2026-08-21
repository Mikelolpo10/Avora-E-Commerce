import { useState, useRef } from "react"
import useCloseRef from "@/hooks/useCloseRef";
import SortDropdown from "./SortDropdown";

interface SortProps {
  sortOptions: {
    name: string;
    value: string;
  }[]
}

export default function SortButton({ sortOptions }: SortProps) {
  const sortRef = useRef<HTMLDivElement>(null)
  const [openSort, setOpenSort] = useState<boolean>(false)

  useCloseRef({
    ref: sortRef,
    setter: setOpenSort
  })

  return (
    <div
      onClick={() => setOpenSort(!openSort)}
      ref={sortRef}
      className="relative mr-4 flex items-center gap-1 cursor-pointer select-none hover:underline hover:underline-offset-2"
    >
      <SortDropdown openSort={openSort} sortOptions={sortOptions} />
    </div>
  )
}