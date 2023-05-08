import { Router } from "express";
import * as menuExtraController from '../controllers/menu-extra.controller';

const router = Router();

router.get("/", menuExtraController.readAll);
router.get("/:menuExtraId", menuExtraController.readOne);
router.post("/", menuExtraController.create);
router.put("/:menuExtraId", menuExtraController.update);
router.delete("/:menuExtraId", menuExtraController.deleteOne);


export default router;