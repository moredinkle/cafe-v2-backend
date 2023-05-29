"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const menuItemController = __importStar(require("../controllers/menu-item.controller"));
const router = (0, express_1.Router)();
// router.get("/", menuItemController.readAll);
router.get("/:menuId/items/:menuItemId", menuItemController.readOne);
router.get("/:menuId/items", menuItemController.readByMenuId);
router.get("/:menuId/sales", menuItemController.readSalesReport);
router.get("/:menuId/ushers", menuItemController.readUshersReport);
router.get("/:menuId/report", menuItemController.readFullReport);
router.post("/:menuId/items", menuItemController.create);
router.put("/:menuId/items/:menuItemId", menuItemController.update);
router.delete("/:menuId/items/:menuItemId", menuItemController.deleteOne);
exports.default = router;
//# sourceMappingURL=menu-item.routes.js.map