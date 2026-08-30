import { type Dispatch, type SetStateAction } from "react";
import type { Product, Variant } from "@/interfaces/product.interface";

interface ColorOptionsProps {
  data: Product;
  activeVariant: Variant;
  setActiveVariant: Dispatch<SetStateAction<Variant | undefined>>
}

export default function ColorOptions({ data, activeVariant, setActiveVariant }: ColorOptionsProps) {
  const colorOptions: Variant[] = Array.from(
    new Map((data.variants ?? []).map((v) => [v.color_name, v])).values()
  ); 

  function changeColor(newColor: string) {
    const matchedVariant = data.variants?.find(
      (v: Variant) => v.size === activeVariant?.size && v.color_name === newColor 
    );

    if (matchedVariant) {
      setActiveVariant(matchedVariant);
    }
  }

  return (
    <div className="mt-2 flex flex-col gap-3">
      <span className="text-primary-black text-sm font-semibold">Color: {activeVariant?.color_name}</span>
      <div className="flex gap-2">
        {colorOptions.map(({ color_name, color_code }) => (
          <div
            key={color_name}
            onClick={() => changeColor(color_name)}
            className={`${color_name === activeVariant?.color_name ? 'border-primary border-3 bg-white' : ''} p-0.5 w-10 h-10 bg-ash rounded-full cursor-pointer`}
          >
            <div className={`w-full h-full rounded-full`} style={{ backgroundColor: color_code.toLowerCase() }}></div>
          </div>
        ))}
      </div>
    </div>
  )
}