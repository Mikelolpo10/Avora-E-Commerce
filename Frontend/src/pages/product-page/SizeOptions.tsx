import { Link } from "react-router";
import { useState } from "react"
import { RulerDimensionLine } from "lucide-react";

interface SizeOption {
  size: string;
  active: boolean;
}

export default function SizeOptions() {
  const [sizeOptions, setSizeOptions] = useState<SizeOption[]>([
    { size: 'S', active: true },
    { size: 'M', active: false },
    { size: 'L', active: false },
    { size: 'XL', active: false },
    { size: 'XXL', active: false },
  ])
  const selectedSize = sizeOptions.find((size) => size.active)

  function changeSize(index: number) {
    const selectedSize = sizeOptions[index]

    if (selectedSize.active === false) {
      setSizeOptions((prev) =>
        prev.map((item) =>
          item.size === selectedSize.size
            ? { ...item, active: true }
            : { ...item, active: false }
        )
      )
    }
  }

  return (
    <div>
      <span className="text-primary-black text-sm font-semibold">Size: {selectedSize?.size}</span>
      <div className="flex gap-2">
        {sizeOptions.map(({ size, active }, index) => (
          <div
            key={size}
            onClick={() => changeSize(index)}
            className={`${active ? 'bg-primary text-white border-0' : 'border-2'} p-0.5 w-8 h-8 border-ash rounded-xs cursor-pointer`}
          >
            <div className='flex items-center justify-center w-full h-full text-sm'>{size}</div>
          </div>
        ))}
      </div>
      <Link to="/help/size-guide" className="mt-3 flex items-center gap-1 text-blue-600 text-sm"><RulerDimensionLine size={20} /> Size Guide</Link>
    </div>
  )
}