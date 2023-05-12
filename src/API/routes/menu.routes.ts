import { Router } from "express";
import * as menuController from '../controllers/menu.controller';
import * as menuItemController from '../controllers/menu-item.controller';
import * as menuExtraController from '../controllers/menu-extra.controller';

const router = Router();

router.get("/", menuController.readAll);
router.get("/:menuId", menuController.readOne);
router.get("/:menuId/complete", menuController.readWithItems);
router.post("/", menuController.create);
router.put("/:menuId", menuController.update);
router.delete("/:menuId", menuController.deleteOne);
//items
// router.get("/:menuId/items", menuItemController.readByMenuId);
// router.get("/:menuId/sales", menuItemController.readSalesReport);
//extras
// router.get("/:menuId/extras", menuExtraController.readByMenuId);


export default router;