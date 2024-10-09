import { forwardRef } from "react";
import { IconPlaintProps } from "../types/icon.types";

export const UserIcon = forwardRef<SVGSVGElement, IconPlaintProps>(
  ({ className }, ref) => (
    <svg
      className={className}
      ref={ref}
      width="33"
      height="32"
      viewBox="0 0 33 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16.75 16.0002C19.6967 16.0002 22.0833 13.6135 22.0833 10.6668C22.0833 7.72016 19.6967 5.3335 16.75 5.3335C13.8033 5.3335 11.4167 7.72016 11.4167 10.6668C11.4167 13.6135 13.8033 16.0002 16.75 16.0002ZM16.75 18.6668C13.19 18.6668 6.08334 20.4535 6.08334 24.0002V26.6668H27.4167V24.0002C27.4167 20.4535 20.31 18.6668 16.75 18.6668Z" />
    </svg>
  ),
);
export const UserOutlinedIcon = forwardRef<SVGSVGElement, IconPlaintProps>(
  ({ className }, ref) => (
    <svg
      className={className}
      ref={ref}
      width="33"
      height="32"
      viewBox="0 0 33 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16.75 7.99992C18.2167 7.99992 19.4167 9.19992 19.4167 10.6666C19.4167 12.1333 18.2167 13.3333 16.75 13.3333C15.2833 13.3333 14.0833 12.1333 14.0833 10.6666C14.0833 9.19992 15.2833 7.99992 16.75 7.99992ZM16.75 21.3333C20.35 21.3333 24.4833 23.0533 24.75 23.9999H8.75001C9.05668 23.0399 13.1633 21.3333 16.75 21.3333ZM16.75 5.33325C13.8033 5.33325 11.4167 7.71992 11.4167 10.6666C11.4167 13.6133 13.8033 15.9999 16.75 15.9999C19.6967 15.9999 22.0833 13.6133 22.0833 10.6666C22.0833 7.71992 19.6967 5.33325 16.75 5.33325ZM16.75 18.6666C13.19 18.6666 6.08334 20.4533 6.08334 23.9999V26.6666H27.4167V23.9999C27.4167 20.4533 20.31 18.6666 16.75 18.6666Z" />
    </svg>
  ),
);

UserIcon.displayName = "UserIcon";
UserOutlinedIcon.displayName = "UserOutlinedIcon";
