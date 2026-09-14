import { Minus, Plus } from "lucide-react";
import { easeInOut, motion } from "motion/react";
import { useState, type Dispatch } from "react";

import type { FilterOptions, FilterAction } from "../../interfaces/filter.interface";
import Checkbox from "../../components/common/Checkbox";

interface FilterSelectionProps extends FilterOptions {
  dispatch: Dispatch<FilterAction>;
}

export default function FilterSelection({ name: groupName, options, dispatch }: FilterSelectionProps) {
  const [openSelection, setOpenSelection] = useState(false);

  if (groupName === "Price") {
    return (
      <div className="flex flex-col">
        <div
          className="mb-2 py-4 flex justify-between cursor-pointer select-none"
          onClick={() => setOpenSelection(!openSelection)}
        >
          <h3 className={`${openSelection ? "font-semibold" : "font-normal"}`}>
            {groupName}
          </h3>

          {openSelection ? <Minus /> : <Plus />}
        </div>

        {openSelection && (
          <motion.div
            initial={{ opacity: '0%', translateX: "10%" }}
            animate={{ opacity: '100%', translateX: "0%" }}
            transition={{ duration: 0.3, ease: easeInOut }}
            className="mb-4 flex flex-col gap-3 z-0"
          >
            {options.map(({ name, value, checked }) => (
              <div key={name} className="flex select-none">
                <input
                  type="radio"
                  key={name}
                  id={name}
                  name={groupName}
                  checked={checked}
                  onChange={() => dispatch({ type: "TOGGLE", groupName, value })}
                  className="w-4 mr-3 cursor-pointer"
                />
                <label htmlFor={name} className="cursor-pointer">{name}</label>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    )
  } else {
    return (
      <div className="flex flex-col">
        <div
          className="mb-2 py-4 flex justify-between cursor-pointer select-none"
          onClick={() => setOpenSelection(!openSelection)}
        >
          <h3 className={`${openSelection ? "font-semibold" : "font-normal"}`}>
            {groupName}
          </h3>

          {openSelection ? <Minus /> : <Plus />}
        </div>

        {openSelection && (
          <motion.div
            initial={{ opacity: '0%', translateX: "10%" }}
            animate={{ opacity: '100%', translateX: "0%" }}
            transition={{ duration: 0.3, ease: easeInOut }}
            className="mb-4 flex flex-col gap-3 z-0"
          >
            {options.map((item) => (
              <Checkbox
                key={item.name}
                groupName={groupName}
                option={item}
                dispatch={dispatch}
              />
            ))}
          </motion.div>
        )}
      </div>
    );
  }
}