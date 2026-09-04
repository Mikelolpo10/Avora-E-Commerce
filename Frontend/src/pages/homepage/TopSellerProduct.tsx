import type { TopSellerProductData } from "../../interfaces/product.interface";

export default function TopSellerProduct({ name, img, colors }: TopSellerProductData) {
  function getContrastText(hex: string) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.5 ? 'text-white' : 'text-black';
  }

  return (
    <div className="flex w-68 flex-col items-center justify-center">
      <div className="flex" style={{ backgroundColor: colors[0] }}>
        <img src={img} alt={name} loading="lazy" />
      </div>
      <div className="my-6 flex w-[80%] justify-around">
        {colors.map((color, index) => (
          <div key={index} className="relative group">
            <div
              className="flex h-5 w-5 rounded-full cursor-pointer"
              style={{ backgroundColor: color }}
            ></div>
            <div
              className={`
                ${getContrastText(color)} 
                bottom-8 absolute p-2 opacity-0 rounded-md translate-x-[-35%] transition-all duration-200 select-none group-hover:opacity-100 group-hover:z-10 group-hover:select-text
              `}
              style={{ backgroundColor: color }}
            >
              {color}
            </div>
          </div>
        ))}
      </div>
      <h2 className="text-primary text-xl font-semibold">{name}</h2>
    </div>
  )
}