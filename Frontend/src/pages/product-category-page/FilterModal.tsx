import { AnimatePresence, motion, easeOut } from "motion/react";
import { SlidersHorizontal, X } from "lucide-react";
import { type Dispatch, type SetStateAction, useReducer, useRef, useMemo } from "react";

import type { FilterOptions, FilterAction } from "../../interfaces/filter.interface";
import useCloseRef from "../../hooks/useCloseRef";
import FilterSelection from "./FilterSelection";
import Divider from "../../components/common/Divider";

interface FilterProps {
  openFilter: boolean;
  setOpenFilter: Dispatch<SetStateAction<boolean>>;
}


export default function FilterModal({ openFilter, setOpenFilter }: FilterProps) {
  const filterRef = useRef(null)
  const [filterOptions, dispatch] = useReducer(changeFilter, [
    {
      name: "Category",
      options: [
        { name: "Bra", value: "bra", checked: false },
        { name: "Sportswear", value: "sportswear", checked: false },
        { name: "Underwear", value: "underwear", checked: false },
        { name: "Night Wear", value: "night-wear", checked: false },
      ],
    },
    {
      name: "Price",
      options: [
        { name: "Under Rp100.000", value: "0-100000", checked: false },
        { name: "Rp100.000 - Rp250.000", value: "100000-250000", checked: false },
        { name: "Rp250.000 - Rp500.000", value: "250000-500000", checked: false },
        { name: "Above Rp500.000", value: "500000+", checked: false },
      ],
    },
    {
      name: "Material",
      options: [
        { name: "Cotton", value: "cotton", checked: false },
        { name: "Polyester", value: "polyester", checked: false },
        { name: "Nylon", value: "nylon", checked: false },
        { name: "Spandex", value: "spandex", checked: false },
        { name: "Lace", value: "lace", checked: false },
      ],
    },
    {
      name: "Size",
      options: [
        { name: "XS", value: "xs", checked: false },
        { name: "S", value: "s", checked: false },
        { name: "M", value: "m", checked: false },
        { name: "L", value: "l", checked: false },
        { name: "XL", value: "xl", checked: false },
        { name: "XXL", value: "xxl", checked: false },
      ],
    },
  ]);
  const activeFilterCount = useMemo(
    () =>
      filterOptions.reduce(
        (total, group) => total + group.options.filter((opt) => opt.checked).length,
        0
      ),
    [filterOptions]
  );

  function changeFilter(state: FilterOptions[], action: FilterAction): FilterOptions[] {
    switch (action.type) {
      case "TOGGLE":
        return state.map((group) =>
          group.name !== action.groupName ? group : {
            ...group,
            options: group.options.map((opt) =>
              opt.value !== action.value
                ? opt
                : { ...opt, checked: !opt.checked }
            ),
          }
        );

      case "RESET_ALL":
        return state.map((group) => ({
          ...group,
          options: group.options.map((opt) => ({ ...opt, checked: false })),
        }));

      default:
        return state;
    }
  }

  useCloseRef({
    ref: filterRef,
    setter: setOpenFilter
  })

  return (
    <>
      <div onClick={() => setOpenFilter(true)} className="flex items-center gap-2 cursor-pointer select-none">
        <SlidersHorizontal size={20} />
        Filter
      </div>

      <AnimatePresence>
        {openFilter && (
          <div className="fixed inset-0 flex justify-end bg-black/60 z-30">
            <motion.div
              ref={filterRef}
              initial={{ translateX: "100%" }}
              animate={{ translateX: "0%" }}
              exit={{ translateX: "100%" }}
              transition={{ duration: 0.4, ease: easeOut }}
              className="relative px-4 flex flex-col bg-white h-full w-[35%] overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-100"
            >
              <div className="py-5 flex h-fit w-full">
                <h3 className="mr-4 text-lg">Filter</h3>
                <div className="ml-auto cursor-pointer">
                  <X size={28} strokeWidth={2} onClick={() => setOpenFilter(false)} />
                </div>
              </div>
              <div className="mt-4 flex flex-col">
                {/* Maybe tambahin garis antar setiap selection saat open */}
                {filterOptions.map((filter) => (
                  <div>
                    <Divider color="ash" />
                    <FilterSelection
                      key={filter.name}
                      name={filter.name}
                      options={filter.options}
                      dispatch={dispatch}
                    />
                    <Divider color="ash" />
                  </div>
                ))}
              </div>

              <div className="sticky bottom-0 mt-auto py-4 flex w-full justify-between gap-2 bg-white font-normal">
                <div onClick={() => dispatch({ type: "RESET_ALL" })} className="py-2 flex w-full justify-center border border-primary text-primary-black select-none cursor-pointer">
                  Reset Filter ({activeFilterCount})
                </div>

                <div className="py-2 flex w-full justify-center bg-primary text-white select-none cursor-pointer">
                  Apply Filter
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}