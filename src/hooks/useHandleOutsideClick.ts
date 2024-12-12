import { useEffect, RefObject } from "react";

export function useHandleOutsideClick(
  ref: RefObject<HTMLDivElement | null>,
  setIsDropdownOpen: (isOpen: boolean) => void
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setIsDropdownOpen]);
}
