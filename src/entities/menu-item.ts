export default class MenuItem {
  id: string;
  name: string;
  price: number;
  stock: number;
  menuId: string;

  constructor(name: string, price: number, stock: number, menuId: string) {
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.menuId = menuId;
  }
}
