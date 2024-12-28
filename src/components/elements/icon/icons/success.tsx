import { forwardRef } from "react";
import { IconPlaintProps } from "../types/icon.types";

export const SuccessIcon = forwardRef<SVGSVGElement, IconPlaintProps>(
  ({ className }, ref) => (
    <svg
      className={className}
      ref={ref}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11.7266 21.1667L6.16665 15.6067L4.27332 17.4867L11.7266 24.94L27.7267 8.94L25.8466 7.06L11.7266 21.1667Z" />
    </svg>
  ),
);

SuccessIcon.displayName = "SuccessIcon";
