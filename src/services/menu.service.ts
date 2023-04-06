import "reflect-metadata";
import MenuRepository from "../database/repositories/menu.repository";
import HttpError from "../utils/http-error";
import Menu from "../entities/menu";
import logger from "jet-logger";
import MenuItemService from './menu-item.service';

export default class MenuService {
  private menuRepository: MenuRepository;
  private menuItemService: MenuItemService;
  constructor() {
    this.menuRepository = new MenuRepository();
    this.menuItemService = new MenuItemService();
  }

  async readAll() {
    const menus = await this.menuRepository.readAll();
    return menus;
  }

  async readOne(id: string) {
    const menu = await this.menuRepository.readOne(id);
    return menu;
  }

  async readFiltered(field: string, value: string) {
    const menu = await this.menuRepository.readFiltered(field, value);
    return menu;
  }

  async readWithItems(id: string){
    const menu = await this.menuRepository.readOne(id);
    const items = await this.menuItemService.readByMenuId(id);
    return {menu, items};
  }

  async create(menu: Menu) {
    try {
      let newId = await this.menuRepository.create(menu);
      return newId;
    } catch (error) {
        throw new HttpError(400, error.message || "Bad request");
    }
  }

  async update(menu: Menu) {
    try {
      const exisitingMenu = await this.readOne(menu.id);
      if (exisitingMenu) {
        await this.menuRepository.update(menu);
      } else {
        throw new HttpError(404, "Menu not found");
      }
    } catch (error) {
        throw new HttpError(400, error.message || "Bad request");
    }
  }

  async deleteOne(id: string) {
    const deletedRows = await this.menuRepository.deleteOne(id);
    if (deletedRows !== 0) {
      logger.info(`Menu with id:${id} deleted`);
    } else {
      throw new HttpError(404, "Menu not found");
    }
  }
}