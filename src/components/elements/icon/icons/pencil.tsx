import { forwardRef } from "react";
import { IconPlaintProps } from "../types/icon.types";

export const PencilIcon = forwardRef<SVGSVGElement, IconPlaintProps>(
  ({ className }, ref) => (
    <svg
      className={className}
      ref={ref}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.0692 7.16311L11.7156 6.80956L11.3621 7.16311L3.81208 14.7131L3.66563 14.8596V15.0667V15.8333V16.3333H4.16563H4.9323H5.1394L5.28585 16.1869L12.8358 8.63689L13.1894 8.28333L12.8358 7.92978L12.0692 7.16311ZM14.4858 3.09522C14.547 3.0341 14.6349 3 14.7156 3C14.8113 3 14.8887 3.03023 14.9537 3.09522L16.9037 5.04522C17.0335 5.17496 17.0335 5.38338 16.9037 5.51311L15.7323 6.68456L13.3144 4.26667L14.4858 3.09522ZM2.99896 14.5821L11.7156 5.86544L14.1335 8.28333L5.41686 17H2.99896V14.5821Z"
        fill="#347BEF"
        stroke="#347BEF"
      />
    </svg>
  ),
);

PencilIcon.displayName = "PencilIcon";
