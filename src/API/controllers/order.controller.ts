import { Request, Response, NextFunction } from "express";
import OrderService from "../../services/order.service";
import Order from "../../entities/order";
import HttpError from "../../utils/http-error";
import { toOrderType } from "../../utils/types.converter";

const orderService = new OrderService();

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { total, payedWith, change, type } = req.body;
    const checkedType = toOrderType(type);
    if (!total || !payedWith || !change || !checkedType) {
      throw new HttpError(400, "Bad request");
    }
    const order = new Order(total, payedWith, change, checkedType);
    const newId = await orderService.create(order);
    res.status(201).json({
      message: "Account saved successfully",
      newId: newId,
    });
  } catch (error) {
    next(error);
  }
}

export async function readOne(req: Request, res: Response, next: NextFunction) {
  try {
    const { OrderId } = req.params;
    const Order = await orderService.readOne(OrderId);
    res.status(200).json({
      message: "Order  found",
      data: Order,
    });
  } catch (error) {
    next(error);
  }
}

export async function readAll(req: Request, res: Response, next: NextFunction) {
  try {
    const Orders = await orderService.readAll();
    res.status(200).json({
      message: "Orders found",
      data: Orders,
    });
  } catch (error) {
    next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { OrderId } = req.params;
    const { total, payedWith, change, type } = req.body;
    const checkedType = toOrderType(type);
    if (!total || !payedWith || !change || !checkedType) {
      throw new HttpError(400, "Bad request");
    }
    const order = await orderService.readOne(OrderId);
    order.total = total;
    order.payedWith = payedWith;
    order.change = change;
    order.type = type;
    await orderService.update(order);
    res.status(200).json({
      message: "Order updated successfully",
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteOne(req: Request, res: Response, next: NextFunction) {
  try {
    const { OrderId } = req.params;
    await orderService.deleteOne(OrderId);
    res.status(204).json({ message: "Order  deleted" });
  } catch (error) {
    next(error);
  }
}
