import "reflect-metadata";
import OrderItemRepository from "../database/repositories/order-item.repository";
import HttpError from "../utils/http-error";
import OrderItem from "../entities/order-item";
import logger from "jet-logger";

export default class OrderItemService {
  private OrderItemRepository: OrderItemRepository;
  constructor() {
    this.OrderItemRepository = new OrderItemRepository();
  }

  async readAll() {
    const orderItems = await this.OrderItemRepository.readAll();
    return orderItems;
  }

  async readOne(id: string) {
    const orderItem = await this.OrderItemRepository.readOne(id);
    return orderItem;
  }
  //TODO esto se crea al guardar una orden ???
  async create(orderItem: OrderItem) {
    try {
      let newId = await this.OrderItemRepository.create(orderItem);
      return newId;
    } catch (error) {
        throw new HttpError(400, error.message || "Bad request");
    }
  }

  async update(orderItem: OrderItem) {
    try {
      const exisitingOrderItem = await this.readOne(orderItem.id);
      if (exisitingOrderItem) {
        await this.OrderItemRepository.update(orderItem);
      } else {
        throw new HttpError(404, "Order item not found");
      }
    } catch (error) {
        throw new HttpError(400, error.message || "Bad request");
    }
  }

  async deleteOne(id: string) {
    const deletedRows = await this.OrderItemRepository.deleteOne(id);
    if (deletedRows !== 0) {
      logger.info(`Order item with id:${id} deleted`);
    } else {
      throw new HttpError(404, "Order item not found");
    }
  }
}