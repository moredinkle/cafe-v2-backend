import { AppDataSource } from "../data-source";
import OrderItemEntity from "../db-entities/order-item.entity";
import OrderItem from "../../entities/order-item";

export default class orderItemRepository {
  async create(orderItem: OrderItemEntity) {
    const orderItemRepository = AppDataSource.getRepository(OrderItemEntity);
    const created = await orderItemRepository.insert(orderItem);
    return created.generatedMaps[0].id;
  }

  async readAll() {
    const repository = AppDataSource.getRepository(OrderItemEntity);
    let orderItems = await repository.find();
    return orderItems ? orderItems.map((orderItem) => orderItem as OrderItem) : undefined;
  }

  async readOne(id: string):Promise<OrderItem | undefined> {
    const repository = AppDataSource.getRepository(OrderItemEntity);
    let orderItem = await repository.findOneBy({id: id});
    return orderItem ? (orderItem as OrderItem) : undefined;
  }

  // async readByMenuId(menuId: string):Promise<OrderItem[] | undefined> {
  //   const repository = AppDataSource.getRepository(OrderItemEntity);
  //   let orderItems = await repository.findBy({: menuId});
  //   return menuItems ? menuItems.map((menuItem) => menuItem as MenuItem) : undefined;
  // }

  async update(orderItem: OrderItemEntity) {
    const repository = AppDataSource.getRepository(OrderItemEntity);
    const newValues = {
        quantity: orderItem.quantity,
        subtotal: orderItem.subtotal,
        menuItemId: orderItem.menuItemId,
        orderId: orderItem.orderId
    };
    await repository.update(orderItem.id, newValues);
  }

  async deleteOne(id: string) {
    const repository = AppDataSource.getRepository(OrderItemEntity);
    let deleted = await repository.delete({id: id});
    return deleted.affected;
  }
}