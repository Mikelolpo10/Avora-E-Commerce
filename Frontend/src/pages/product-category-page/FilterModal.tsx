import { AnimatePresence, motion, easeOut } from "motion/react";
import { SlidersHorizontal, X } from "lucide-react";
import type { SetURLSearchParams } from "react-router";
import { type Dispatch, type SetStateAction, useRef, useMemo } from "react";

import type { FilterAction, FilterOptions, CheckedFilter } from "@/interfaces/filter.interface";
import useCloseRef from "../../hooks/useCloseRef";
import FilterSelection from "./FilterSelection";
import Divider from "../../components/common/Divider";

interface FilterProps {
  openFilter: boolean;
  setOpenFilter: Dispatch<SetStateAction<boolean>>;
  filterOptions: FilterOptions[];
  dispatch: Dispatch<FilterAction>;
  setSearchParams: SetURLSearchParams;
  checkedFilters: CheckedFilter[];
}


export default function FilterModal({ openFilter, setOpenFilter, filterOptions, dispatch, setSearchParams }: FilterProps) {
  const filterRef = useRef(null);
  const activeFilterCount = useMemo(
    () =>
      filterOptions.reduce(
        (total, group) => total + group.options.filter((opt) => opt.checked).length,
        0
      ),
    [filterOptions]
  );

  useCloseRef({
    ref: filterRef,
    setter: setOpenFilter
  })

  const handleApplyFilter = () => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      filterOptions.forEach((group) => {
        const key = group.name.toLowerCase();
        const checkedOptions = group.options.filter((opt) => opt.checked);

        if (checkedOptions.length === 0) {
          next.delete(key);
          return;
        }

        if (typeof checkedOptions[0].value === "object") {
          const { min, max } = checkedOptions[0].value as {
            min: string;
            max: string;
          };

          next.set(key, `${min}-${max}`);
        } else {
          const values = checkedOptions.map(
            (opt) => opt.value as string
          );

          next.set(key, values.join(","));
        }
      });

      return next;
    });
  };


  return (
    <>
      <div onClick={() => setOpenFilter(true)} className="flex items-center gap-2 text-sm cursor-pointer select-none">
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
                {filterOptions.map((filter) => (
                  <div key={filter.name}>
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

                <div onClick={handleApplyFilter} className="py-2 flex w-full justify-center bg-primary text-white select-none cursor-pointer">
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