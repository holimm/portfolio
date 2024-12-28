"use client";
import { forwardRef, useMemo, type HTMLAttributes } from "react";

import { useLoad, type UseLoadProps } from "../utils/useLoad";
import { Flex } from "@/components/layout/flex";
import { Heading } from "../../typography";

export interface LoadData {}

export interface LoadOptions extends UseLoadProps {}

export interface LoadProps
  extends LoadOptions,
    Omit<HTMLAttributes<HTMLDivElement>, keyof UseLoadProps>,
    LoadData {
  loading?: boolean;
}

export const Load = forwardRef<HTMLDivElement, LoadProps>(
  ({ className, children, loading, ...props }, ref) => {
    const { ...context } = useLoad({ ref, loading, ...props });

    const ctx = useMemo(() => context, [context]);
    const Component = "div";

    return (
      <Component
        ref={ctx.loadRef}
        data-comp="load"
        className={`${className} ${ctx.loadStyle()}`}
        {...props}
      >
        <div className="absolute left-1/2 top-2/4 -translate-x-1/2 -translate-y-1/2">
          <Flex
            className="h-full"
            layout="col"
            justify="center"
            align="center"
            gap="2xl"
          >
            <Flex gap="2xl">
              <svg
                className="animate-spin-sequence [animation-delay:-0.66s]"
                width="60"
                height="58"
                viewBox="0 0 60 58"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M26.6938 57.0498H21.7078C10.253 57.0498 0.968201 47.8693 0.968201 36.5491V20.5687C0.968201 9.24898 10.2525 0.0664062 21.7078 0.0664062H38.8745C50.3299 0.0664062 59.6142 9.24898 59.6142 20.5687L59.6142 36.5491C59.6142 47.8693 50.3294 57.0498 38.8745 57.0498H33.8886V57.0833H26.6938V57.0498ZM21.708 49.9555C14.2281 49.9555 8.16319 43.9601 8.16319 36.5659V20.5855C8.16319 13.1909 14.2286 7.19423 21.708 7.19423H38.8748C46.3543 7.19423 52.4196 13.1909 52.4196 20.5855L52.4196 36.5659C52.4196 43.9601 46.3547 49.9555 38.8747 49.9555H33.8888H26.694H21.708Z"
                  fill="white"
                />
              </svg>
              <svg
                className="animate-spin-sequence [animation-delay:-0.33s]"
                width="60"
                height="58"
                viewBox="0 0 60 58"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M26.6938 57.0498H21.7078C10.253 57.0498 0.968201 47.8693 0.968201 36.5491V20.5687C0.968201 9.24898 10.2525 0.0664062 21.7078 0.0664062H38.8745C50.3299 0.0664062 59.6142 9.24898 59.6142 20.5687L59.6142 36.5491C59.6142 47.8693 50.3294 57.0498 38.8745 57.0498H33.8886V57.0833H26.6938V57.0498ZM21.708 49.9555C14.2281 49.9555 8.16319 43.9601 8.16319 36.5659V20.5855C8.16319 13.1909 14.2286 7.19423 21.708 7.19423H38.8748C46.3543 7.19423 52.4196 13.1909 52.4196 20.5855L52.4196 36.5659C52.4196 43.9601 46.3547 49.9555 38.8747 49.9555H33.8888H26.694H21.708Z"
                  fill="white"
                />
              </svg>
              <svg
                className="animate-spin-sequence"
                width="60"
                height="58"
                viewBox="0 0 60 58"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M26.6938 57.0498H21.7078C10.253 57.0498 0.968201 47.8693 0.968201 36.5491V20.5687C0.968201 9.24898 10.2525 0.0664062 21.7078 0.0664062H38.8745C50.3299 0.0664062 59.6142 9.24898 59.6142 20.5687L59.6142 36.5491C59.6142 47.8693 50.3294 57.0498 38.8745 57.0498H33.8886V57.0833H26.6938V57.0498ZM21.708 49.9555C14.2281 49.9555 8.16319 43.9601 8.16319 36.5659V20.5855C8.16319 13.1909 14.2286 7.19423 21.708 7.19423H38.8748C46.3543 7.19423 52.4196 13.1909 52.4196 20.5855L52.4196 36.5659C52.4196 43.9601 46.3547 49.9555 38.8747 49.9555H33.8888H26.694H21.708Z"
                  fill="white"
                />
              </svg>
            </Flex>
            <Flex gap="2xl" justify="center">
              <Heading className="text-white">Đợi xíu nhen...</Heading>
            </Flex>
          </Flex>
        </div>
      </Component>
    );
  },
);

Load.displayName = "Load";
