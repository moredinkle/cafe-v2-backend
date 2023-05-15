import "reflect-metadata";
import MenuItemRepository from "../database/repositories/menu-item.repository";
import HttpError from "../utils/http-error";
import MenuItem from "../entities/menu-item";
import logger from "jet-logger";

export default class MenuItemService {
  private menuItemRepository: MenuItemRepository;
  constructor() {
    this.menuItemRepository = new MenuItemRepository();
  }

  async readAll() {
    const items = await this.menuItemRepository.readAll();
    return items;
  }

  async readOne(id: string) {
    const item = await this.menuItemRepository.readOne(id);
    return item;
  }

  async readByMenuId(menuId: string) {
    const items = await this.menuItemRepository.readByMenuId(menuId);
    return items;
  }

  async readSalesReport(menuId: string) {
    const items = await this.menuItemRepository.readMenuSalesReport(menuId);
    return items;
  }

  async readUshersReport(menuId: string) {
    const items = await this.menuItemRepository.readMenuUshersReport(menuId);
    return items;
  }

  async create(menuItem: MenuItem) {
    try {
      let newId = await this.menuItemRepository.create(menuItem);
      return newId;
    } catch (error) {
      throw new HttpError(400, error.message || "Bad request");
    }
  }

  async update(menuItem: MenuItem) {
    try {
      const exisitingMenuItem = await this.readOne(menuItem.id);
      if (exisitingMenuItem) {
        await this.menuItemRepository.update(menuItem);
      } else {
        throw new HttpError(404, "Menu item not found");
      }
    } catch (error) {
      throw new HttpError(400, error.message || "Bad request");
    }
  }

  async deleteOne(id: string) {
    const deletedRows = await this.menuItemRepository.deleteOne(id);
    if (deletedRows !== 0) {
      logger.info(`MenuItem with id:${id} deleted`);
    } else {
      throw new HttpError(404, "Menu item not found");
    }
  }
}
