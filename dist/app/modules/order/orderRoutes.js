"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middleware/auth"));
const client_1 = require("@prisma/client");
const orderController_1 = require("./orderController");
const route = (0, express_1.Router)();
route.post('/create', (0, auth_1.default)(client_1.Role.USER), orderController_1.orderController.createOrderController);
exports.orderRoutes = route;
