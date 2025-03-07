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
exports.paymentController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const jsonwebtoken_1 = require("jsonwebtoken");
const paymentService_1 = require("./paymentService");
const sendResponse_1 = __importDefault(require("../../middleware/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const paymentSSLCommerceController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const body = req.body;
    const userInfo = (0, jsonwebtoken_1.decode)(token);
    console.log(body);
    const payload = { totalAmount: body.totalAmount, name: userInfo === null || userInfo === void 0 ? void 0 : userInfo.name, email: userInfo === null || userInfo === void 0 ? void 0 : userInfo.email };
    const result = yield paymentService_1.paymentService.paymentSSLCommerce(payload);
    console.log(result);
    (0, sendResponse_1.default)(res, { statusCode: http_status_codes_1.StatusCodes.ACCEPTED, message: "Payment successfully completed", success: true, data: result });
}));
exports.paymentController = { paymentSSLCommerceController };
