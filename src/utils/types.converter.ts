import { ExtraType, MenuStatus, OrderType } from "./types";

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

export function toOrderType(str: string): OrderType | undefined {
  let result: OrderType;
  switch (str) {
    case "VENTA":
      result = "VENTA";
      break;
    case "SERVIDOR":
      result = "SERVIDOR";
      break;
    default:
      return undefined;
  }
  return result;
}

export function toExtraType(str: string): ExtraType | undefined {
  let result: ExtraType;
  switch (str) {
    case "GASTO":
      result = "GASTO";
      break;
    case "INGRESO":
      result = "INGRESO";
      break;
    default:
      return undefined;
  }
  return result;
}
