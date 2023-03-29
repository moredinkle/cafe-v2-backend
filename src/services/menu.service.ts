import "reflect-metadata";
import MenuRepository from "../database/repositories/menu.repository";
import HttpError from "../utils/http-error";
import Menu from "../entities/menu";
import logger from "jet-logger";

export default class MenuService {
  private menuRepository: MenuRepository;
  constructor() {
    this.menuRepository = new MenuRepository();
  }

  async readAll() {
    const menus = await this.menuRepository.readAll();
    return menus;
  }

  async readOne(id: string) {
    const menu = await this.menuRepository.readOne(id);
    return menu;
  }

  async create(menu: Menu) {
    try {
      let newId = await this.menuRepository.create(menu);
      return newId;
    } catch (error) {
        throw new HttpError(400, "Bad request");
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
        throw new HttpError(400, "Bad request");
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