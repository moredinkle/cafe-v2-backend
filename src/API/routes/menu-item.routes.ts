import { Router } from "express";
import * as menuItemController from '../controllers/menu-item.controller';

const router = Router();

// router.get("/", menuItemController.readAll);
router.get("/:menuId/items/:menuItemId", menuItemController.readOne);
router.get("/:menuId/items", menuItemController.readByMenuId);
router.get("/:menuId/sales", menuItemController.readSalesReport);
router.get("/:menuId/ushers", menuItemController.readUshersReport);
router.post("/:menuId/items", menuItemController.create);
router.put("/:menuId/items/:menuItemId", menuItemController.update);
router.delete("/:menuId/items/:menuItemId", menuItemController.deleteOne);


export default router;