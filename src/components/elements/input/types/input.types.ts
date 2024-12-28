export type IInputType =
  | "text"
  | "password"
  | "email"
  | "number"
  | "range"
  | "date"
  | "time"
  | "datetime-local"
  | "checkbox"
  | "radio"
  | "file"
  | "hidden"
  | "url"
  | "tel"
  | "search";

export enum Status {
  Normal = "normal",
  Success = "success",
  Error = "error",
  Enable = "enable",
  Disable = "disable",
  Loading = "loading",
  Fetching = "fetching",
  Paused = "paused",
  Idle = "idle",
}
