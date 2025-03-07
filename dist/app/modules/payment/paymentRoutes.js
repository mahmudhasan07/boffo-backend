"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middleware/auth"));
const client_1 = require("@prisma/client");
const paymentController_1 = require("./paymentController");
const route = (0, express_1.Router)();
route.get("/", (0, auth_1.default)(client_1.Role.USER), paymentController_1.paymentController.paymentSSLCommerceController);
exports.paymentRoutes = route;
