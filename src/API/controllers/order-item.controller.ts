import { Request, Response, NextFunction } from "express";
import OrderItemService from "../../services/order-item.service";
import OrderItem from "../../entities/order-item";
import HttpError from "../../utils/http-error";

const orderItemService = new OrderItemService();

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { quantity ,subtotal ,menuItemId } = req.body;
    const { orderId } = req.params;
    if (!quantity || !subtotal || !menuItemId || !orderId) {
      throw new HttpError(400, "Bad request");
    }
    const orderItem = new OrderItem(quantity ,subtotal ,menuItemId ,orderId);
    const newId = await orderItemService.create(orderItem)
    res.status(201).json({
      message: "Menu item saved successfully",
      newId: newId,
    });
  } catch (error) {
    next(error);
  }
}

export async function readOne(req: Request, res: Response, next: NextFunction) {
  try {
    const { orderItemId } = req.params;
    const item = await orderItemService.readOne(orderItemId);
    res.status(200).json({
      message: "Menu item found",
      data: item,
    });
  } catch (error) {
    next(error);
  }
}
//TODO
// export async function readByMenuId(req: Request, res: Response, next: NextFunction) {
//   try {
//     const { menuId } = req.params;
//     const items = await orderItemService.readByMenuId(menuId);
//     res.status(200).json({
//       message: "Menu items found",
//       data: items,
//     });
//   } catch (error) {
//     next(error);
//   }
// }

export async function readAll(req: Request, res: Response, next: NextFunction) {
  try {
    const items = await orderItemService.readAll();
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
    const { orderItemId } = req.params;
    const { quantity, subtotal } = req.body;
    if (!quantity || !subtotal ||  !orderItemId) {
      throw new HttpError(400, "Bad request");
    }
    const orderItem = await orderItemService.readOne(orderItemId);
    orderItem.quantity = quantity;
    orderItem.subtotal = subtotal;
    await orderItemService.update(orderItem);
    res.status(200).json({
      message: "Item updated successfully",
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteOne(req: Request, res: Response, next: NextFunction) {
  try {
    const { orderItemId } = req.params;
    await orderItemService.deleteOne(orderItemId);
    res.status(204).json({
      message: "Menu item deleted",
    });
  } catch (error) {
    next(error);
  }
}
