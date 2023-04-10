import { Router } from "express";
import * as orderItemController from '../controllers/order-item.controller';

const router = Router();

router.get("/", orderItemController.readAll);
router.get("/:orderItemId", orderItemController.readOne);
router.post("/", orderItemController.create);
// router.put("/:orderItemId", orderItemController.update);
router.delete("/:orderItemId", orderItemController.deleteOne);


export default router;