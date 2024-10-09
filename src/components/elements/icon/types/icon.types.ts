import { HTMLAttributes } from "react";

export interface IconPlainOptions {}

export interface IconPlaintProps
  extends IconPlainOptions,
    Omit<HTMLAttributes<HTMLDivElement>, keyof IconPlainOptions>,
    IconPlainOptions {}
