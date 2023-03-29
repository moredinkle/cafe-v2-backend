import { AppDataSource } from "../data-source";
import MenuEntity from "../db-entities/menu.entity";
import Menu from "../../entities/menu";
import logger from 'jet-logger';

export default class MenuRepository {
  async create(menu: MenuEntity) {
    const menuRepository = AppDataSource.getRepository(MenuEntity);
    const created = await menuRepository.insert(menu);
    return created.generatedMaps[0].id;
  }

  async readAll() {
    const repository = AppDataSource.getRepository(MenuEntity);
    let Menus = await repository.find();
    return Menus ? Menus.map((menu) => menu as Menu) : undefined;
  }

  async readOne(id: string):Promise<Menu | undefined> {
    const repository = AppDataSource.getRepository(MenuEntity);
    let Menu = await repository.findOneBy({id: id});
    return Menu ? (Menu as Menu) : undefined;
  }

  async update(menu: MenuEntity) {
    const repository = AppDataSource.getRepository(MenuEntity);
    const newValues = {
      date: menu.date,
      status: menu.status
    };
    await repository.update(menu.id, newValues);
  }

  async deleteOne(id: string) {
    const repository = AppDataSource.getRepository(MenuEntity);
    let deleted = await repository.delete({id: id});
    return deleted.affected;
  }
}