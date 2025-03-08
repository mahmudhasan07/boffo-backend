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
    // const payload = { body, name: userInfo?.name, email: userInfo?.email }
    const id = userInfo === null || userInfo === void 0 ? void 0 : userInfo.id;
    const result = yield paymentService_1.paymentService.paymentSSLCommerce(body, id);
    (0, sendResponse_1.default)(res, { statusCode: http_status_codes_1.StatusCodes.ACCEPTED, message: "Payment successfully completed", success: true, data: result });
}));
const updatePaymentController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const paymentId = (_a = req.query) === null || _a === void 0 ? void 0 : _a.tran_id;
    const body = req === null || req === void 0 ? void 0 : req.body;
    const result = yield paymentService_1.paymentService.updatePaymentIntoDB(paymentId);
    if (result) {
        res.redirect(`${process.env.WEB_URL}/success`);
    }
}));
const cancelPaymentController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const result = yield paymentService_1.paymentService.cancelPaymentIntoDB(id);
    if (result) {
        res.redirect(`${process.env.WEB_URL}/cancel`);
    }
}));
const failPaymentController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const result = yield paymentService_1.paymentService.cancelPaymentIntoDB(id);
    if (result) {
        res.redirect(`${process.env.WEB_URL}/cancel`);
    }
}));
exports.paymentController = { paymentSSLCommerceController, updatePaymentController, cancelPaymentController, failPaymentController };
