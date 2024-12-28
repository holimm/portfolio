import { FocusEvent, useCallback, useMemo, useState } from "react";

import {
  dropdownVariants,
  type DropdownVariantProps,
} from "../styles/dropdown.config";

export interface DropdownProps extends DropdownVariantProps {
  ref?: React.Ref<HTMLDivElement> | undefined;
}
export type UseDropdownProps = DropdownProps &
  Omit<DropdownVariantProps, keyof DropdownVariantProps>;

export const useDropdown = (props: UseDropdownProps) => {
  const { ref: dropdownRef, variant = "default" } = props;
  const [open, setOpen] = useState<boolean>(false);

  const {
    root: dropdownStyle,
    header: dropdownHeaderStyle,
    content: dropdownContentStyle,
  } = useMemo(
    () =>
      dropdownVariants({
        variant,
      }),
    [variant],
  );

  const handleToggleDropdown = useCallback((value: boolean) => {
    setOpen(value);
  }, []);

  const handleDropdownBlur = useCallback(
    (event: FocusEvent<HTMLDivElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        handleToggleDropdown(false);
      }
    },
    [handleToggleDropdown],
  );

  return {
    variant,
    open,
    handleToggleDropdown,
    handleDropdownBlur,
    dropdownStyle,
    dropdownHeaderStyle,
    dropdownContentStyle,
    dropdownRef,
  };
};

export type UseDropdownReturn = ReturnType<typeof useDropdown>;
