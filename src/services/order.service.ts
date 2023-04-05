import "reflect-metadata";
import OrderRepository from "../database/repositories/order.repository";
import HttpError from "../utils/http-error";
import Order from "../entities/order";
import logger from "jet-logger";

export default class OrderService {
  private OrderRepository: OrderRepository;
  constructor() {
    this.OrderRepository = new OrderRepository();
  }

  async readAll() {
    const orders = await this.OrderRepository.readAll();
    return orders;
  }

  async readOne(id: string) {
    const order = await this.OrderRepository.readOne(id);
    return order;
  }

  async create(order: Order) {
    try {
      let newId = await this.OrderRepository.create(order);
      return newId;
    } catch (error) {
        throw new HttpError(400, error.message || "Bad request");
    }
  }

  async update(order: Order) {
    try {
      const exisitingOrder = await this.readOne(order.id);
      if (exisitingOrder) {
        await this.OrderRepository.update(order);
      } else {
        throw new HttpError(404, "Order not found");
      }
    } catch (error) {
        throw new HttpError(400, error.message || "Bad request");
    }
  }

  async deleteOne(id: string) {
    const deletedRows = await this.OrderRepository.deleteOne(id);
    if (deletedRows !== 0) {
      logger.info(`Order with id:${id} deleted`);
    } else {
      throw new HttpError(404, "Order not found");
    }
  }
}