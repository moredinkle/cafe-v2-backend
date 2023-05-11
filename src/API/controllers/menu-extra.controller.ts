import { Request, Response, NextFunction } from "express";
import MenuExtraService from "../../services/menu-extra.service";
import MenuExtra from "../../entities/menu-extra";
import HttpError from "../../utils/http-error";
import { toExtraType } from "../../utils/types.converter";

const menuExtraService = new MenuExtraService();

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { description, amount, type, menuId } = req.body;
    const extraType = toExtraType(type);
    if (!description || !amount || !extraType || !menuId) {
      throw new HttpError(400, "Bad request. Missing or incorrect data.");
    }
    const menuExtra = new MenuExtra(description, amount, type, menuId);
    const newId = await menuExtraService.create(menuExtra);
    res.status(201).json({
      message: "Menu item saved successfully",
      newmenuExtraId: newId,
    });
  } catch (error) {
    next(error);
  }
}

export async function readOne(req: Request, res: Response, next: NextFunction) {
  try {
    const { menuExtraId } = req.params;
    const item = await menuExtraService.readOne(menuExtraId);
    res.status(200).json({
      message: "Menu item found",
      data: item,
    });
  } catch (error) {
    next(error);
  }
}

export async function readByMenuId(req: Request, res: Response, next: NextFunction) {
  try {
    const { menuId } = req.params;
    const items = await menuExtraService.readByMenuId(menuId);
    res.status(200).json({
      message: "Menu items found",
      data: items,
    });
  } catch (error) {
    next(error);
  }
}

export async function readAll(req: Request, res: Response, next: NextFunction) {
  try {
    const items = await menuExtraService.readAll();
    res.status(200).json({
      message: "Menu items found",
      data: items,
    });
  } catch (error) {
    next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { menuExtraId } = req.params;
    const { description, amount, type } = req.body;
    const extraType = toExtraType(type);
    if (!description || !amount || !extraType || !menuExtraId) {
      throw new HttpError(400, "Bad request");
    }
    const menuExtra = await menuExtraService.readOne(menuExtraId);
    menuExtra.description = description;
    menuExtra.amount = amount;
    menuExtra.type = extraType;
    await menuExtraService.update(menuExtra);
    res.status(200).json({
      message: "Item updated successfully",
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteOne(req: Request, res: Response, next: NextFunction) {
  try {
    const { menuExtraId } = req.params;
    await menuExtraService.deleteOne(menuExtraId);
    res.status(204).json({
      message: "Menu item deleted",
    });
  } catch (error) {
    next(error);
  }
}
