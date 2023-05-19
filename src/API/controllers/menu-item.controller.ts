import { Request, Response, NextFunction } from "express";
import MenuItemService from "../../services/menu-item.service";
import MenuItem from "../../entities/menu-item";
import HttpError from "../../utils/http-error";

const menuItemService = new MenuItemService();

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, price, stock } = req.body;
    const { menuId } = req.params;
    if (!name || !price || !stock || !menuId) {
      throw new HttpError(400, "Bad request");
    }
    const menuItem = new MenuItem(name, price, stock, menuId);
    const newId = await menuItemService.create(menuItem);
    res.status(201).json({
      message: "Menu item saved successfully",
      newMenuItemId: newId,
    });
  } catch (error) {
    next(error);
  }
}

export async function readOne(req: Request, res: Response, next: NextFunction) {
  try {
    const { menuItemId } = req.params;
    const item = await menuItemService.readOne(menuItemId);
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
    const items = await menuItemService.readByMenuId(menuId);
    res.status(200).json({
      message: "Menu items found",
      data: items,
    });
  } catch (error) {
    next(error);
  }
}

export async function readSalesReport(req: Request, res: Response, next: NextFunction) {
  try {
    const { menuId } = req.params;
    const items = await menuItemService.readSalesReport(menuId);
    res.status(200).json({
      message: "Sales report found",
      data: items,
    });
  } catch (error) {
    next(error);
  }
}

export async function readUshersReport(req: Request, res: Response, next: NextFunction) {
  try {
    const { menuId } = req.params;
    const items = await menuItemService.readUshersReport(menuId);
    res.status(200).json({
      message: "Sales report found",
      data: items,
    });
  } catch (error) {
    next(error);
  }
}

export async function readFullReport(req: Request, res: Response, next: NextFunction) {
  try {
    const { menuId } = req.params;
    const report = await menuItemService.readFullReport(menuId);
    res.status(200).json({
      message: "Sales report found",
      data: report,
    });
  } catch (error) {
    next(error);
  }
}

export async function readAll(req: Request, res: Response, next: NextFunction) {
  try {
    const items = await menuItemService.readAll();
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
    const { menuItemId } = req.params;
    const { name, price, stock } = req.body;
    if (!name || !price || !stock || !menuItemId) {
      throw new HttpError(400, "Bad request");
    }
    const menuItem = await menuItemService.readOne(menuItemId);
    menuItem.name = name;
    menuItem.price = price;
    menuItem.stock = stock;
    await menuItemService.update(menuItem);
    res.status(200).json({
      message: "Item updated successfully",
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteOne(req: Request, res: Response, next: NextFunction) {
  try {
    const { menuItemId } = req.params;
    await menuItemService.deleteOne(menuItemId);
    res.status(204).json({
      message: "Menu item deleted",
    });
  } catch (error) {
    next(error);
  }
}
