import { forwardRef } from "react";
import { IconPlaintProps } from "../types/icon.types";

export const CloseIcon = forwardRef<SVGSVGElement, IconPlaintProps>(
  ({ className }, ref) => (
    <svg
      className={className}
      ref={ref}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.1262 5.34175L10.8215 9.64653L10.4679 10.0001L10.8215 10.3536L15.1262 14.6584L14.6583 15.1263L10.3536 10.8215L10 10.468L9.64645 10.8215L5.34167 15.1263L4.87378 14.6584L9.17856 10.3536L9.53211 10.0001L9.17856 9.64653L4.87378 5.34175L5.34167 4.87385L9.64645 9.17863L10 9.53219L10.3536 9.17863L14.6583 4.87386L15.1262 5.34175Z"
        fill="#347BEF"
        stroke="#347BEF"
      />
    </svg>
  ),
);

CloseIcon.displayName = "CloseIcon";
