import "reflect-metadata";
import OrderItemRepository from "../database/repositories/order-item.repository";
import HttpError from "../utils/http-error";
import OrderItem from "../entities/order-item";
import logger from "jet-logger";
import MenuItemService from './menu-item.service';

export default class OrderItemService {
  private OrderItemRepository: OrderItemRepository;
  private menuItemService: MenuItemService;
  constructor() {
    this.OrderItemRepository = new OrderItemRepository();
    this.menuItemService = new MenuItemService();
  }

  async readAll() {
    const orderItems = await this.OrderItemRepository.readAll();
    return orderItems;
  }

  async readOne(id: string) {
    const orderItem = await this.OrderItemRepository.readOne(id);
    return orderItem;
  }
  
  async create(orderItem: OrderItem) {
    try {
      let newId = await this.OrderItemRepository.create(orderItem);
      const menuItem = await this.menuItemService.readOne(orderItem.menuItemId);
      menuItem.stock = menuItem.stock - orderItem.quantity;
      await this.menuItemService.update(menuItem);
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