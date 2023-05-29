"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jet_logger_1 = __importDefault(require("jet-logger"));
function errorMiddleware(error, request, response, next) {
    const status = error.status || 500;
    const message = error.message;
    jet_logger_1.default.err(`Code: ${status} - Message: ${message}`);
    response.setHeader('Content-type', 'application/json');
    response.status(status).json({
        status,
        message,
    });
}
exports.default = errorMiddleware;
//# sourceMappingURL=error-middleware.js.map