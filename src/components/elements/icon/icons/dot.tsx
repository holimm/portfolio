import { forwardRef } from "react";
import { IconPlaintProps } from "../types/icon.types";

export const DotIcon = forwardRef<SVGSVGElement, IconPlaintProps>(
  ({ className }, ref) => (
    <svg
      className={className}
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width="6"
      height="6"
      viewBox="0 0 6 6"
    >
      <circle cx="3" cy="3" r="3" />
    </svg>
  ),
);

DotIcon.displayName = "DotIcon";
