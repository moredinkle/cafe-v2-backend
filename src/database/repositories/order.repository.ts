import { AppDataSource } from "../data-source";
import OrderEntity from "../db-entities/order.entity";
import Order from "../../entities/order";

export default class orderRepository {
  async create(order: OrderEntity) {
    console.log(order);
    const orderRepository = AppDataSource.getRepository(OrderEntity);
    const created = await orderRepository.insert(order);
    return created.generatedMaps[0].id;
  }

  async readAll() {
    const repository = AppDataSource.getRepository(OrderEntity);
    let orders = await repository.find();
    return orders ? orders.map((order) => order as Order) : undefined;
  }

  async readOne(id: string):Promise<Order | undefined> {
    const repository = AppDataSource.getRepository(OrderEntity);
    let order = await repository.findOneBy({id: id});
    return order ? (order as Order) : undefined;
  }

  async update(order: OrderEntity) {
    const repository = AppDataSource.getRepository(OrderEntity);
    const newValues = {
        total: order.total,
        payedWith: order.payedWith,
        change: order.change,
        type: order.type
    };
    await repository.update(order.id, newValues);
  }

  async deleteOne(id: string) {
    const repository = AppDataSource.getRepository(OrderEntity);
    let deleted = await repository.delete({id: id});
    return deleted.affected;
  }
}