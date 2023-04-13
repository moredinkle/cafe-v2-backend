import { Router } from "express";
import * as menuController from '../controllers/menu.controller';
import * as menuItemController from '../controllers/menu-item.controller';

const router = Router();

router.get("/", menuController.readAll);
router.get("/:menuId", menuController.readOne);
router.get("/:menuId/complete", menuController.readWithItems); 
router.get("/:menuId/items", menuItemController.readByMenuId);
router.get("/:menuId/sales-report", menuItemController.readSalesReport);
router.post("/", menuController.create);
router.put("/:menuId", menuController.update);
router.delete("/:menuId", menuController.deleteOne);


export default router;