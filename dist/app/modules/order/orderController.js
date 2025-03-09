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
exports.orderController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const orderService_1 = require("./orderService");
const jsonwebtoken_1 = require("jsonwebtoken");
const sendResponse_1 = __importDefault(require("../../middleware/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const pagination_1 = require("../../helper/pagination");
const createOrderController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const token = req.headers.authorization;
    const { id } = (0, jsonwebtoken_1.decode)(token);
    const result = yield orderService_1.orderService.createOrder(body, id);
    (0, sendResponse_1.default)(res, { statusCode: http_status_codes_1.StatusCodes.CREATED, message: "Order successfully created", success: true, data: result });
}));
const userOrdersController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const { id } = (0, jsonwebtoken_1.decode)(token);
    const result = yield orderService_1.orderService.userOrdersFromDB(id);
    (0, sendResponse_1.default)(res, { statusCode: http_status_codes_1.StatusCodes.OK, message: "Orders fetched successfully", success: true, data: result });
}));
const adminOrdersController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orderService_1.orderService.allOrdersFromDB();
    const { data, limit, page, total, totalPage } = (0, pagination_1.paginationSystem)(result, req);
    (0, sendResponse_1.default)(res, { statusCode: http_status_codes_1.StatusCodes.OK, message: "Orders fetched successfully", success: true, data: data, meta: { limit: limit, page: page, total: total, totalPage: totalPage } });
}));
const adminStatusController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const body = req.body;
    const result = yield orderService_1.orderService.statusUpdateFormDB(body, id);
    (0, sendResponse_1.default)(res, { statusCode: http_status_codes_1.StatusCodes.OK, message: "Orders fetched successfully", success: true, data: result });
}));
exports.orderController = { createOrderController, adminOrdersController, userOrdersController, adminStatusController };
