import { ChevronRight, WashingMachine } from "lucide-react"
import Divider from "@/components/common/Divider"
import { useState } from "react";

export interface DropdownProps {
  title: string;
  body: string;
}

export default function DescriptionDropdown({ title, body }: DropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div className="flex flex-col">
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="py-3 mb-2 flex justify-between cursor-pointer select-none"
      >
        <h2 className={`${isOpen && 'text-secondary font-semibold'} text-lg font-medium transition-colors duration-100`}>{title}</h2>
        <ChevronRight
          color={`${isOpen ? '#c8a35c' : '#0a0a0a'}`}
          size={22}
          strokeWidth={3}
          className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`}
        />
      </div>
      {isOpen && (
        <div className="mb-3 flex gap-2">
          <WashingMachine color="#c8a35c" size={30} />
          <p className="pb-4 text-[#303030] text-base">{body}</p>
        </div>
      )}
      <Divider />
    </div>

  )
}