"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toExtraType = exports.toOrderType = exports.toMenuStatus = void 0;
function toMenuStatus(str) {
    let result;
    switch (str) {
        case "ACTIVE":
            result = "ACTIVE";
            break;
        case "INACTIVE":
            result = "INACTIVE";
            break;
        case "FINISHED":
            result = "FINISHED";
            break;
        default:
            return undefined;
    }
    return result;
}
exports.toMenuStatus = toMenuStatus;
function toOrderType(str) {
    let result;
    switch (str) {
        case "VENTA":
            result = "VENTA";
            break;
        case "SERVIDOR":
            result = "SERVIDOR";
            break;
        default:
            return undefined;
    }
    return result;
}
exports.toOrderType = toOrderType;
function toExtraType(str) {
    let result;
    switch (str) {
        case "GASTO":
            result = "GASTO";
            break;
        case "INGRESO":
            result = "INGRESO";
            break;
        default:
            return undefined;
    }
    return result;
}
exports.toExtraType = toExtraType;
//# sourceMappingURL=types.converter.js.map