export default class OrderItem {
  id: string;
  quantity: number;
  subtotal: number;
  menuItemId: string;
  orderId: string;

  constructor(quantity: number, subtotal: number, menuItemId: string, orderId: string) {
    this.quantity = quantity;
    this.subtotal = subtotal;
    this.menuItemId = menuItemId;
    this.orderId = orderId;
  }
}
