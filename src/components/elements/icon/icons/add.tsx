import { forwardRef } from "react";
import { IconPlaintProps } from "../types/icon.types";

export const AddIcon = forwardRef<SVGSVGElement, IconPlaintProps>(
  ({ className }, ref) => (
    <svg
      className={className}
      ref={ref}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="#25262C" />
    </svg>
  ),
);

AddIcon.displayName = "AddIcon";
