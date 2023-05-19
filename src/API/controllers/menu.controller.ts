import { Request, Response, NextFunction } from "express";
import MenuService from "../../services/menu.service";
import Menu from "../../entities/menu";
import HttpError from "../../utils/http-error";
import { toMenuStatus } from "../../utils/types.converter";

const menuService = new MenuService();

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { date, status } = req.body;
    const checkedStatus = toMenuStatus(status);
    const finalDate = new Date(date);
    if (!date || !checkedStatus) {
      throw new HttpError(400, "Bad request");
    }
    const menu = new Menu(finalDate, checkedStatus);
    const newId = await menuService.create(menu);
    res.status(201).json({
      message: "Menu saved successfully",
      newMenuId: newId,
    });
  } catch (error) {
    next(error);
  }
}

export async function readOne(req: Request, res: Response, next: NextFunction) {
  try {
    const { menuId } = req.params;
    const menu = await menuService.readOne(menuId);
    res.status(200).json({
      message: "Menu  found",
      data: menu,
    });
  } catch (error) {
    next(error);
  }
}

export async function readComplete(req: Request, res: Response, next: NextFunction) {
  try {
    const { menuId } = req.params;
    const menu = await menuService.readComplete(menuId);
    res.status(200).json({
      message: "Menu found",
      menuData: menu,
    });
  } catch (error) {
    next(error);
  }
}

export async function readAll(req: Request, res: Response, next: NextFunction) {
  try {
    let { field, value, start, end } = req.query;
    field = field as string;
    value = value as string;
    start = start as string;
    end = end as string;
    let menus = undefined;
    if (field && value) {
      menus = await menuService.readFiltered(field, value);
    } else if(start && end){
      menus = await menuService.readByDate(start, end);
    }
    else{
      menus = await menuService.readAll();
    }
    res.status(200).json({
      message: "Menus found",
      data: menus,
    });
  } catch (error) {
    next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { menuId } = req.params;
    const { status } = req.body;
    const checkedStatus = toMenuStatus(status);
    if (!checkedStatus) {
      throw new HttpError(400, "Bad request");
    }
    const menu = await menuService.readOne(menuId);
    menu.status = checkedStatus;
    const updated = await menuService.update(menu);
    res.status(200).json({
      message: "Menu updated successfully",
      updatedMenu: updated
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteOne(req: Request, res: Response, next: NextFunction) {
  try {
    const { menuId } = req.params;
    await menuService.deleteOne(menuId);
    res.status(204).json({
      message: "Menu  deleted",
    });
  } catch (error) {
    next(error);
  }
}
