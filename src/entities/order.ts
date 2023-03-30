import { OrderType } from "../utils/types";

export default class Order {
  id: string;
  total: number;
  payedWith: number;
  change: number;
  type: OrderType;

  constructor(total: number, payedWith: number, change: number, type: OrderType) {
    this.total = total;
    this.payedWith = payedWith;
    this.change = change;
    this.type = type;
  }
}
