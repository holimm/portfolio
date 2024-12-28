import { forwardRef } from "react";
import { IconPlaintProps } from "../types/icon.types";

export const WarningIcon = forwardRef<SVGSVGElement, IconPlaintProps>(
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
      <path d="M5.96 27.3383H26.04C28.0933 27.3383 29.3733 25.1117 28.3467 23.3384L18.3067 5.99168C17.28 4.21835 14.72 4.21835 13.6933 5.99168L3.65333 23.3384C2.62667 25.1117 3.90667 27.3383 5.96 27.3383ZM16 18.005C15.2667 18.005 14.6667 17.405 14.6667 16.6717V14.005C14.6667 13.2717 15.2667 12.6717 16 12.6717C16.7333 12.6717 17.3333 13.2717 17.3333 14.005V16.6717C17.3333 17.405 16.7333 18.005 16 18.005ZM17.3333 23.3384H14.6667V20.6717H17.3333V23.3384Z" />
    </svg>
  ),
);

WarningIcon.displayName = "WarningIcon";
