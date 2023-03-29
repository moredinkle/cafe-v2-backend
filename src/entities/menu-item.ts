export default class MenuItem {
  id: string;
  name: string;
  price: number;
  stock: number;
  menuId: string;

  constructor(id: string, name: string, price: number, stock: number, menuId: string) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.menuId = menuId;
  }
}
