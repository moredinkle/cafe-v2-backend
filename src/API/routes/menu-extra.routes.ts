import { Router } from "express";
import * as menuExtraController from '../controllers/menu-extra.controller';

const router = Router();

// router.get("/", menuExtraController.readAll);
router.get("/:menuId/extras/:menuExtraId", menuExtraController.readOne);
router.get("/:menuId/extras", menuExtraController.readByMenuId);
router.post("/:menuId/extras", menuExtraController.create);
router.put("/:menuId/extras/:menuExtraId", menuExtraController.update);
router.delete("/:menuId/extras/:menuExtraId", menuExtraController.deleteOne);


export default router;