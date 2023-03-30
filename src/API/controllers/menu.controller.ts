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
      message: "Account saved successfully",
      newItemId: newId,
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

export async function readAll(req: Request, res: Response, next: NextFunction) {
  try {
    const menus = await menuService.readAll();
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
    await menuService.update(menu);
    res.status(200).json({
      message: "Menu updated successfully",
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
