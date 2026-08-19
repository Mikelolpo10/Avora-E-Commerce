import { useState } from "react";

interface ColorOption {
  name: string;
  color: string;
  active: boolean;
}

export default function ColorOptions() {
  const [colorOptions, setColorOptions] = useState<ColorOption[]>([
    { name: 'Navy Blue', color: 'bg-blue-400', active: true },
    { name: 'Dark Ash', color: 'bg-black/80', active: false },
    { name: 'Spring Orange', color: 'bg-orange-400', active: false }
  ])
  const selectedColor = colorOptions.find((i) => i.active === true)


  function changeColor(index: number) {
    const selectedColor = colorOptions[index]

    if (selectedColor.active === false) {
      setColorOptions((prev) =>
        prev.map((item) =>
          item.name === selectedColor.name
            ? { ...item, active: true }
            : { ...item, active: false }
        )
      )
    }
  }

  return (
    <div className="mt-2 flex flex-col gap-3">
      <span className="text-primary-black text-sm font-semibold">Color: {selectedColor?.name}</span>
      <div className="flex gap-2">
        {colorOptions.map(({ name, color, active }, index) => (
          <div
            key={name}
            onClick={() => changeColor(index)}
            className={`${active ? 'border-primary border-3 bg-white' : ''} p-0.5 w-10 h-10 bg-ash rounded-full cursor-pointer`}
          >
            <div className={`w-full h-full ${color} rounded-full`}></div>
          </div>
        ))}
      </div>
    </div>
  )
}