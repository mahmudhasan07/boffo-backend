"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = require("express");
const uploadFile_1 = require("../../helper/uploadFile");
const productController_1 = require("./productController");
const parseBodyData_1 = require("../../middleware/parseBodyData");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const productValidation_1 = require("./productValidation");
const route = (0, express_1.Router)();
route.post("/create", uploadFile_1.fileUploader.uploadProductImages, parseBodyData_1.parseBodyMiddleware, (0, validateRequest_1.default)(productValidation_1.productValidation), productController_1.productController.productAddController);
route.get("/", productController_1.productController.productGetController);
route.get("/:id", productController_1.productController.productGetSingleController);
route.delete("/:id", productController_1.productController.productDeleteController);
exports.productRoutes = route;
