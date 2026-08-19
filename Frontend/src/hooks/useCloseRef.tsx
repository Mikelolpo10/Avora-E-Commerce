import { type RefObject, useEffect } from "react";

interface CloseProps {
  ref: RefObject<HTMLDivElement | null>;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function useCloseRef({ ref, setter }: CloseProps) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref?.current &&
        !ref.current.contains(event.target as Node)
      ) {
        setter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setter]);
}