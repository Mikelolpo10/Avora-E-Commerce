import type { Variant } from "@/interfaces/product.interface"
import { Minus, Plus, ExternalLink, Heart } from "lucide-react"
import { useState, type ChangeEvent } from "react"

interface AddToCartProps {
  activeVariant: Variant;
}

export default function AddToCart({ activeVariant }: AddToCartProps) {
  const [quantity, setQuantity] = useState<number>(1)

  function handleQuantity(e: ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value)

    if (value === 0) {
      setQuantity(1)
    } else if (value > activeVariant.stock) {
      setQuantity(activeVariant.stock)
    } else {
      setQuantity(value)
    }
  }

  function opQuantity(op: string) {
    if (op === '-') {
      if (quantity > 1) setQuantity(quantity - 1)
    } else {
      if (quantity < activeVariant.stock) {
        setQuantity(quantity + 1)
      }
    }
  }


  return (
    <>
      <div className="mt-2 flex h-12">
        <div className="flex items-center border border-black w-48 rounded-3xl overflow-hidden">
          <button onClick={() => opQuantity('-')} className="w-12 flex items-center justify-center cursor-pointer">
            <Minus size={18} />
          </button>

          <input
            type="number"
            value={quantity}
            onChange={(e) => handleQuantity(e)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.currentTarget.blur();
              }
            }}
            className="w-12 h-12 text-center outline-none border-none"
          />

          <button onClick={() => opQuantity('+')} className="w-12 flex items-center justify-center cursor-pointer">
            <Plus size={18} />
          </button>
        </div>
        <button className="ml-4 w-full bg-primary text-white font-semibold cursor-pointer">Add To Cart</button>
      </div>
      <div className="flex">
        <div className="mr-4 p-2 flex items-center justify-center rounded-full border border-ash cursor-pointer aspect-square">
          <ExternalLink
            color="#101b2f"
            size={22}
            strokeWidth={2} 
          />
        </div>
        <button className="py-2 flex w-full justify-center gap-2 border text-primary font-semibold cursor-pointer">
          <Heart strokeWidth={2} />Add To Wishlist
        </button>
      </div>
    </>
  )
}