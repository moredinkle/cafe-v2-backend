import { Router } from "express";
import * as orderItemController from '../controllers/order-item.controller';

const router = Router();

router.get("/:orderId/items", orderItemController.readAll);
router.get("/:orderId/items/:orderItemId", orderItemController.readOne);
router.post("/:orderId/items/", orderItemController.create);
// router.put("/:orderItemId", orderItemController.update);
router.delete("/:orderId/items/:orderItemId", orderItemController.deleteOne);


export default router;