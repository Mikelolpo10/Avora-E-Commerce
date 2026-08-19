import { Check } from "lucide-react";
import type { ActionDispatch } from "react";
import type { FilterOption, FilterAction } from "@/interfaces/filter.interface";

interface BoxProps {
  groupName: string;
  option: FilterOption;
  dispatch: ActionDispatch<[Action: FilterAction]>;
}

export default function Checkbox({ groupName, option, dispatch }: BoxProps) {
  const { name, value, checked } = option

  return (
    <div className="flex gap-3 text-primary-black font-normal select-none">
      <div
        className={`${checked && "bg-primary border-primary"
          } relative flex h-5.5 w-5.5 rounded-md border-2 border-ash`}
      >
        <input
          type="checkbox"
          name="product-filter"
          id={value}
          checked={checked}
          onChange={() => dispatch({ type: "TOGGLE", groupName, value })}
          className="absolute h-full w-full opacity-0 cursor-pointer"
        />

        {checked && <Check size={20} color="white" />}
      </div>

      <label htmlFor={value} className="cursor-pointer">
        {name}
      </label>
    </div>
  );
}