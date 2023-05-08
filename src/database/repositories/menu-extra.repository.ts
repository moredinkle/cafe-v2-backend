import { AppDataSource } from "../data-source";
import MenuExtraEntity from "../db-entities/menu-extra.entity";
import MenuExtra from "../../entities/menu-extra";

export default class MenuExtraRepository {
  async create(menuExtra: MenuExtraEntity) {
    const menuExtraRepository = AppDataSource.getRepository(MenuExtraEntity);
    const created = await menuExtraRepository.insert(menuExtra);
    return created.generatedMaps[0].id;
  }

  async readAll() {
    const repository = AppDataSource.getRepository(MenuExtraEntity);
    let menuExtras = await repository.find();
    return menuExtras ? menuExtras.map((menuExtra) => menuExtra as MenuExtra) : undefined;
  }

  async readOne(id: string): Promise<MenuExtra | undefined> {
    const repository = AppDataSource.getRepository(MenuExtraEntity);
    let menuExtra = await repository.findOneBy({ id: id });
    return menuExtra ? (menuExtra as MenuExtra) : undefined;
  }

  async readByMenuId(menuId: string): Promise<MenuExtra[] | undefined> {
    const repository = AppDataSource.getRepository(MenuExtraEntity);
    let menuExtras = await repository.findBy({ menuId: menuId });
    return menuExtras ? menuExtras.map((menuExtra) => menuExtra as MenuExtra) : undefined;
  }

  async update(menuExtra: MenuExtraEntity) {
    const repository = AppDataSource.getRepository(MenuExtraEntity);
    const newValues = {
      description: menuExtra.description,
      amount: menuExtra.amount,
      type: menuExtra.type,
    };
    await repository.update(menuExtra.id, newValues);
  }

  async deleteOne(id: string) {
    const repository = AppDataSource.getRepository(MenuExtraEntity);
    let deleted = await repository.delete({ id: id });
    return deleted.affected;
  }
}
