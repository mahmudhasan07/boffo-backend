"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const productService_1 = require("./productService");
const sendResponse_1 = __importDefault(require("../../middleware/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const pagination_1 = require("../../helper/pagination");
const productAddController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const file = req.files;
    const result = yield productService_1.productService.createProductIntoDB(body, file);
    (0, sendResponse_1.default)(res, { message: "Product added successfully", data: result, statusCode: http_status_codes_1.StatusCodes.OK, success: true });
}));
const productGetController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield productService_1.productService.getAllProducts();
    const { data, limit, page, total, totalPage } = yield (0, pagination_1.paginationSystem)(result, req);
    (0, sendResponse_1.default)(res, { message: "Product fetched successfully", data: data, statusCode: http_status_codes_1.StatusCodes.OK, success: true, meta: { limit: limit, page: page, total: total, totalPage: totalPage } });
}));
const productDeleteController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield productService_1.productService.deleteProduct(id);
    (0, sendResponse_1.default)(res, { message: "Product deleted successfully", data: result, statusCode: http_status_codes_1.StatusCodes.OK, success: true });
}));
const productGetSingleController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield productService_1.productService.getSingleProduct(id);
    (0, sendResponse_1.default)(res, { message: "Product fetched successfully", data: result, statusCode: http_status_codes_1.StatusCodes.OK, success: true });
}));
exports.productController = { productAddController, productGetController, productDeleteController, productGetSingleController };
