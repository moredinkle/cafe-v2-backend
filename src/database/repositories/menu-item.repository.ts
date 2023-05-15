import { AppDataSource } from "../data-source";
import MenuItemEntity from "../db-entities/menu-item.entity";
import MenuItem from "../../entities/menu-item";
import logger from "jet-logger";
import { SalesReportRow } from "../../utils/types";

export default class MenuItemRepository {
  async create(menuItem: MenuItemEntity) {
    const menuItemRepository = AppDataSource.getRepository(MenuItemEntity);
    const created = await menuItemRepository.insert(menuItem);
    return created.generatedMaps[0].id;
  }

  async readAll() {
    const repository = AppDataSource.getRepository(MenuItemEntity);
    let MenuItems = await repository.find();
    return MenuItems ? MenuItems.map((menuItem) => menuItem as MenuItem) : undefined;
  }

  async readOne(id: string): Promise<MenuItem | undefined> {
    const repository = AppDataSource.getRepository(MenuItemEntity);
    let MenuItem = await repository.findOneBy({ id: id });
    return MenuItem ? (MenuItem as MenuItem) : undefined;
  }

  async readByMenuId(menuId: string): Promise<MenuItem[] | undefined> {
    const repository = AppDataSource.getRepository(MenuItemEntity);
    let menuItems = await repository.findBy({ menuId: menuId });
    return menuItems ? menuItems.map((menuItem) => menuItem as MenuItem) : undefined;
  }

  async readMenuSalesReport(menuId: string): Promise<SalesReportRow[] | undefined> {
    const report = await AppDataSource.query(`
    select mi.id, mi.name, mi.price, mi.stock, COALESCE(sum(oi.subtotal), 0) as subtotal, coalesce(sum(oi.quantity),0) as sold
    from "MenuItem" mi
    left join "OrderItem" oi
    on mi.id::text = oi."menuItemId"
	  join "Order" ord
	  on ord.id::text = oi."orderId"
    where mi."menuId" = '${menuId}' and ord."type" = 'VENTA'
	  group by mi.id, mi.name, mi.price
    order by subtotal desc
    `);
    return report ? report.map((row: any) => row as SalesReportRow) : undefined;
  }

  async readMenuUshersReport(menuId: string): Promise<SalesReportRow[] | undefined> {
    const report = await AppDataSource.query(`
    select mi.id, mi.name, mi.price, mi.stock, COALESCE(sum(oi.subtotal), 0) as subtotal, coalesce(sum(oi.quantity),0) as sold
    from "MenuItem" mi
    left join "OrderItem" oi
    on mi.id::text = oi."menuItemId"
	  join "Order" ord
	  on ord.id::text = oi."orderId"
    where mi."menuId" = '${menuId}' and ord."type" = 'SERVIDOR'
	  group by mi.id, mi.name, mi.price
    order by subtotal desc
    `);
    return report ? report.map((row: any) => row as SalesReportRow) : undefined;
  }

  async update(menuItem: MenuItemEntity) {
    const repository = AppDataSource.getRepository(MenuItemEntity);
    const newValues = {
      name: menuItem.name,
      price: menuItem.price,
      stock: menuItem.stock,
    };
    await repository.update(menuItem.id, newValues);
  }

  async deleteOne(id: string) {
    const repository = AppDataSource.getRepository(MenuItemEntity);
    let deleted = await repository.delete({ id: id });
    return deleted.affected;
  }
}
