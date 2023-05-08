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
