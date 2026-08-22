import { useState, useRef } from "react"
import { ArrowDownUp, ChevronDown } from "lucide-react"
import useCloseRef from "@/hooks/useCloseRef"

interface SortProps {
  sortOptions: {
    name: string;
    value: string;
  }[]
}

export default function SortButton({ sortOptions }: SortProps) {
  const sortRef = useRef<HTMLDivElement>(null)
  const [openSort, setOpenSort] = useState<boolean>(false)
  const [sortBy, setSortBy] = useState<string>(sortOptions[0].value)

  useCloseRef({
    ref: sortRef,
    setter: setOpenSort
  })

  const selectedSort = sortOptions.find(
    option => option.value === sortBy
  )

  return (
    <div
      onClick={() => setOpenSort(!openSort)}
      ref={sortRef}
      className="relative mr-4 flex items-center gap-1 text-sm text-primary-black cursor-pointer select-none hover:underline hover:underline-offset-2"
    >
      <ArrowDownUp size={20} />
      Sort: {selectedSort?.name}
      <ChevronDown />

      {openSort && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-8 right-0 flex flex-col w-60 rounded-2xl bg-white shadow-[0_0_24px_0_rgba(0,0,0,0.20)] overflow-hidden z-10"
        >
          {sortOptions.map(({ name, value }) => (
            <div key={value} className="px-4 flex h-10 w-full items-center gap-1 bg-white cursor-pointer hover:brightness-95">
              <input
                type="radio"
                name="sort"
                value={value}
                id={value}
                checked={value === sortBy}
                onChange={() => setSortBy(value)}
              />
              <label htmlFor={value} className={`${value === sortBy && 'underline'} flex items-center h-full w-full`}>
                {name}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}