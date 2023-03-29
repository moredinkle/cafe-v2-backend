import { MenuStatus } from "./types";

export function toMenuStatus(str: string): MenuStatus | undefined {
  let result: MenuStatus;
  switch (str) {
    case "ACTIVE":
      result = "ACTIVE";
      break;
    case "INACTIVE":
      result = "INACTIVE";
      break;
    case "FINISHED":
      result = "FINISHED";
      break;
    default:
      return undefined;
  }
  return result;
}
