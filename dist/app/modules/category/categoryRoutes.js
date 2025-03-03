"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = require("express");
const categoryController_1 = require("./categoryController");
const route = (0, express_1.Router)();
route.post("/create", categoryController_1.categoryController.createCategoryController);
route.get("/", categoryController_1.categoryController.getCategoryController);
exports.categoryRoutes = route;
