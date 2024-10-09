import { forwardRef } from "react";
import { IconPlaintProps } from "../types/icon.types";

export const HomeIcon = forwardRef<SVGSVGElement, IconPlaintProps>(
  ({ className }, ref) => (
    <svg
      className={className}
      ref={ref}
      width="33"
      height="32"
      viewBox="0 0 33 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M13.5834 27.3334V19.3334H18.9167V27.3334H25.5834V16.6667H29.5834L16.25 4.66675L2.91669 16.6667H6.91669V27.3334H13.5834Z" />
    </svg>
  ),
);
export const HomeOutlinedIcon = forwardRef<SVGSVGElement, IconPlaintProps>(
  ({ className }, ref) => (
    <svg
      className={className}
      ref={ref}
      width="33"
      height="32"
      viewBox="0 0 33 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16.25 8.25341L22.9167 14.2534V24.6667H20.25V16.6667H12.25V24.6667H9.58335V14.2534L16.25 8.25341ZM16.25 4.66675L2.91669 16.6667H6.91669V27.3334H14.9167V19.3334H17.5834V27.3334H25.5834V16.6667H29.5834L16.25 4.66675Z" />
    </svg>
  ),
);

HomeIcon.displayName = "HomeIcon";
HomeOutlinedIcon.displayName = "HomeOutlinedIcon";
