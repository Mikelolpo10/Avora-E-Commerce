import { Link } from "react-router";
import { type Dispatch, type SetStateAction } from "react"
import { RulerDimensionLine } from "lucide-react";
import type { Product, Variant } from "@/interfaces/product.interface";


interface SizeOptionsProps {
  data: Product;
  activeVariant: Variant;
  setActiveVariant: Dispatch<SetStateAction<Variant | undefined>>
}

export default function SizeOptions({ data, activeVariant, setActiveVariant }: SizeOptionsProps) {
  const sizeOptions: Variant[] = Array.from(
    new Map((data.variants ?? []).map((v) => [v.size, v])).values()
  );

  function changeSize(newSize: string) {
    const matchedVariant = data.variants?.find(
      (v: Variant) => v.size === newSize && v.color_name === activeVariant?.color_name
    );

    if (matchedVariant) {
      setActiveVariant(matchedVariant);
    }
  }

  return (
    <div>
      <span className="text-primary-black text-sm font-semibold">Size: {activeVariant?.size}</span>
      <div className="flex gap-2">
        {sizeOptions.map(({ size }) => (
          <div
            key={size}
            onClick={() => changeSize(size)}
            className={`${size === activeVariant?.size ? 'bg-primary text-white border-0' : 'border-2'} p-0.5 w-8 h-8 border-ash rounded-xs cursor-pointer select-none`}
          >
            <div className='flex items-center justify-center w-full h-full text-sm'>{size}</div>
          </div>
        ))}
      </div>
      <Link to="/help/size-guide" className="mt-3 flex items-center gap-1 text-blue-600 text-sm"><RulerDimensionLine size={20} /> Size Guide</Link>
    </div>
  )
}