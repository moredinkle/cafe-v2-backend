import "reflect-metadata";
import MenuExtraRepository from "../database/repositories/menu-extra.repository";
import HttpError from "../utils/http-error";
import MenuExtra from "../entities/menu-extra";
import logger from "jet-logger";

export default class MenuExtraService {
  private menuExtraRepository: MenuExtraRepository;
  constructor() {
    this.menuExtraRepository = new MenuExtraRepository();
  }

  async readAll() {
    const items = await this.menuExtraRepository.readAll();
    return items;
  }

  async readOne(id: string) {
    const item = await this.menuExtraRepository.readOne(id);
    return item;
  }

  async readByMenuId(menuId: string) {
    const items = await this.menuExtraRepository.readByMenuId(menuId);
    return items;
  }


  async create(menuExtra: MenuExtra) {
    try {
      let newId = await this.menuExtraRepository.create(menuExtra);
      return newId;
    } catch (error) {
      throw new HttpError(400, error.message || "Bad request");
    }
  }

  async update(menuExtra: MenuExtra) {
    try {
      const exisitingmenuExtra = await this.readOne(menuExtra.id);
      if (exisitingmenuExtra) {
        await this.menuExtraRepository.update(menuExtra);
      } else {
        throw new HttpError(404, "Menu item not found");
      }
    } catch (error) {
      throw new HttpError(400, error.message || "Bad request");
    }
  }

  async deleteOne(id: string) {
    const deletedRows = await this.menuExtraRepository.deleteOne(id);
    if (deletedRows !== 0) {
      logger.info(`menuExtra with id:${id} deleted`);
    } else {
      throw new HttpError(404, "Menu item not found");
    }
  }
}
