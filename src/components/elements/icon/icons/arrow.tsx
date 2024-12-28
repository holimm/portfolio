import { forwardRef } from "react";
import { IconPlaintProps } from "../types/icon.types";

export const ArrowHeadRightIcon = forwardRef<SVGSVGElement, IconPlaintProps>(
  ({ className }, ref) => (
    <svg
      className={className}
      ref={ref}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.91688 7.64637L4.78377 2.51325L5.25666 2.04036L11.2162 7.99992L5.25666 13.9595L4.78377 13.4866L9.91688 8.35347L10.2704 7.99992L9.91688 7.64637Z" />
    </svg>
  ),
);

export const ArrowHeadLeftIcon = forwardRef<SVGSVGElement, IconPlaintProps>(
  ({ className }, ref) => (
    <svg
      className={className}
      ref={ref}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6.08312 7.64637L11.2162 2.51325L10.7433 2.04036L4.78377 7.99992L10.7433 13.9595L11.2162 13.4866L6.08312 8.35347L5.72961 7.99992L6.08312 7.64637Z" />
    </svg>
  ),
);

export const ArrowHeadDownIcon = forwardRef<SVGSVGElement, IconPlaintProps>(
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
      <path
        d="M7.41 8.29504L12 12.875L16.59 8.29504L18 9.70504L12 15.705L6 9.70504L7.41 8.29504Z"
        fill="#25262C"
      />
    </svg>
  ),
);

ArrowHeadRightIcon.displayName = "ArrowHeadRightIcon";
ArrowHeadLeftIcon.displayName = "ArrowHeadLeftIcon";
ArrowHeadDownIcon.displayName = "ArrowHeadDownIcon";
