import { Router } from "express";
import * as orderController from '../controllers/order.controller';

const router = Router();

router.get("/", orderController.readAll);
router.get("/:orderId", orderController.readOne);
router.post("/", orderController.create);
// router.put("/:menuId", orderController.update);
router.delete("/:orderId", orderController.deleteOne);

export default router;