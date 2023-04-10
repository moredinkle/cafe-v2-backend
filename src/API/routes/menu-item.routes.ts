import { Router } from "express";
import * as menuItemController from '../controllers/menu-item.controller';

const router = Router();

router.get("/", menuItemController.readAll);
router.get("/:menuItemId", menuItemController.readOne);
router.post("/", menuItemController.create);
router.put("/:menuItemId", menuItemController.update);
router.delete("/:menuItemId", menuItemController.deleteOne);


export default router;