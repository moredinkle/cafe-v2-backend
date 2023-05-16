import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export type MenuStatus = "ACTIVE" | "INACTIVE" |"FINISHED";
export type OrderType = "VENTA" | "SERVIDOR";
export type ExtraType = "GASTO" | "INGRESO";
export type SalesReportRow = {
    id: string,
    name: string,
    price: number,
    subtotal: number,
    sold: number
}
export interface CustomRequest extends Request {
    token: string | JwtPayload;
  }