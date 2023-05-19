import "reflect-metadata";
import MenuRepository from "../database/repositories/menu.repository";
import HttpError from "../utils/http-error";
import Menu from "../entities/menu";
import logger from "jet-logger";
import MenuItemService from './menu-item.service';
import MenuExtraService from "./menu-extra.service";

export default class MenuService {
  private menuRepository: MenuRepository;
  private menuItemService: MenuItemService;
  private menuExtraService: MenuExtraService;
  constructor() {
    this.menuRepository = new MenuRepository();
    this.menuItemService = new MenuItemService();
    this.menuExtraService = new MenuExtraService();
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

  async readByDate(start: string, end: string) {
    const menus = await this.menuRepository.readByDate(start, end);
    return menus;
  }

  async readComplete(id: string){
    const menu = await this.menuRepository.readOne(id);
    const items = await this.menuItemService.readByMenuId(id);
    const sales = await this.menuItemService.readSalesReport(id);
    const ushers = await this.menuItemService.readUshersReport(id);
    const extras = await this.menuExtraService.readByMenuId(id)
    return {menu, items, sales, ushers, extras};
  }

  async create(menu: Menu) {
    try {
      let newId = await this.menuRepository.create(menu);
      return newId;
    } catch (error) {
        throw new HttpError(400, error.message || "Bad request");
    }
  }

  async clearActiveMenus(){
    const activeMenus = await this.menuRepository.readFiltered("status", "ACTIVE");
    for(const menu of activeMenus){
      menu.status = "FINISHED";
      await this.menuRepository.update(menu);
    }
  }

  async update(menu: Menu) {
    try {
      const exisitingMenu = await this.readOne(menu.id);
      if (exisitingMenu) {
        if(menu.status === "ACTIVE") {
          await this.clearActiveMenus();
        }
        await this.menuRepository.update(menu);
        return menu;
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