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
const menuExtraController = __importStar(require("../controllers/menu-extra.controller"));
const router = (0, express_1.Router)();
// router.get("/", menuExtraController.readAll);
router.get("/:menuId/extras/:menuExtraId", menuExtraController.readOne);
router.get("/:menuId/extras", menuExtraController.readByMenuId);
router.post("/:menuId/extras", menuExtraController.create);
router.put("/:menuId/extras/:menuExtraId", menuExtraController.update);
router.delete("/:menuId/extras/:menuExtraId", menuExtraController.deleteOne);
exports.default = router;
//# sourceMappingURL=menu-extra.routes.js.map