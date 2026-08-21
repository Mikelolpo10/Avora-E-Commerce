import { ArrowDownUp, ChevronDown } from "lucide-react"
import { useState } from "react"

interface SortProps {
  openSort: boolean;
  sortOptions: {
    name: string;
    value: string;
  }[];
}

export default function SortDropdown({ openSort, sortOptions }: SortProps) {
  const [sortBy, setSortBy] = useState<string>('best-match')

  const selectedSort = sortOptions.find(
    option => option.value === sortBy
  )

  return (
    <>
      <ArrowDownUp size={20} />
      Sort: {selectedSort?.name}
      <ChevronDown />

      {openSort == true && (
        <div onClick={(e) => e.stopPropagation()} className="absolute top-8 right-0 flex flex-col w-64 rounded-2xl bg-white shadow-[0_0_24px_0_rgba(0,0,0,0.20)] overflow-hidden z-10">
          {sortOptions.map(({ name, value }) => (
            <div key={value} className="px-4 flex h-10 w-full items-center gap-1 bg-white cursor-pointer hover:brightness-95">
              <input
                type="radio"
                name="sort"
                value={value}
                id={value}
                checked={value == sortBy}
                onChange={() => setSortBy(value)}
              />
              <label htmlFor={value} className={`${value == sortBy && 'underline'} flex items-center h-full w-full text-sm text-primary-black`}>{name}</label>
            </div>
          ))}
        </div>
      )}
    </>
  )
}