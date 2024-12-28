import { forwardRef } from "react";
import { IconPlaintProps } from "../types/icon.types";

export const InfoIcon = forwardRef<SVGSVGElement, IconPlaintProps>(
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
      <path d="M16 2.66669C8.63996 2.66669 2.66663 8.64002 2.66663 16C2.66663 23.36 8.63996 29.3334 16 29.3334C23.36 29.3334 29.3333 23.36 29.3333 16C29.3333 8.64002 23.36 2.66669 16 2.66669ZM16 22.6667C15.2666 22.6667 14.6666 22.0667 14.6666 21.3334V16C14.6666 15.2667 15.2666 14.6667 16 14.6667C16.7333 14.6667 17.3333 15.2667 17.3333 16V21.3334C17.3333 22.0667 16.7333 22.6667 16 22.6667ZM17.3333 12H14.6666V9.33335H17.3333V12Z" />
    </svg>
  ),
);

InfoIcon.displayName = "InfoIcon";
