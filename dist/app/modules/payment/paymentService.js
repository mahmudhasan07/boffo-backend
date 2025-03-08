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
exports.paymentService = void 0;
// @ts-ignore
const sslcommerz_lts_1 = __importDefault(require("sslcommerz-lts"));
const mongodb_1 = require("mongodb");
const secret_1 = require("../../../config/secret");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const store_id = secret_1.ssl_id;
const store_passwd = secret_1.ssl_password;
const is_live = false; //true for live, false for sandbox
let paymentCompleteID;
const paymentSSLCommerce = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const result = yield prisma.order.create({
        data: {
            userId: id,
            totalPrice: payload.totalPrice,
            info: payload.info, // Ensure info is an object
            items: {
                create: (_a = payload.items) !== null && _a !== void 0 ? _a : [] // Ensure items is an array
            }
        }
    });
    paymentCompleteID = result === null || result === void 0 ? void 0 : result.id;
    const tran_id = new mongodb_1.ObjectId().toString();
    const data = {
        total_amount: parseFloat(payload === null || payload === void 0 ? void 0 : payload.totalPrice),
        currency: 'BDT',
        tran_id: tran_id, // use unique tran_id for each api call
        success_url: `${(_b = process.env) === null || _b === void 0 ? void 0 : _b.BASE_URL}/api/v1/payment/success?tran_id=${tran_id}`,
        fail_url: `${(_c = process.env) === null || _c === void 0 ? void 0 : _c.BASE_URL}/api/v1/payment/fail?id=${result === null || result === void 0 ? void 0 : result.id}`,
        cancel_url: `${(_d = process.env) === null || _d === void 0 ? void 0 : _d.BASE_URL}/api/v1/payment/cancel?id=${result === null || result === void 0 ? void 0 : result.id}`,
        // ipn_url: `${process.env?.BASE_URL}/api/v1/payment/ipn`,
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: payload === null || payload === void 0 ? void 0 : payload.info.name,
        cus_email: payload === null || payload === void 0 ? void 0 : payload.info.email,
        cus_add1: payload === null || payload === void 0 ? void 0 : payload.info.address,
        cus_add2: 'Dhaka',
        cus_city: payload === null || payload === void 0 ? void 0 : payload.info.city,
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: payload === null || payload === void 0 ? void 0 : payload.info.phone,
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
    try {
        const sslcz = new sslcommerz_lts_1.default(store_id, store_passwd, is_live);
        const apiResponse = yield sslcz.init(data);
        // console.log(apiResponse);
        return { redirectLink: apiResponse.GatewayPageURL };
    }
    catch (error) {
        console.error("SSLCommerz Error:", error);
        return { error: "Failed to generate payment link" };
    }
});
const updatePaymentIntoDB = (paymentId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.order.update({
        where: {
            id: paymentCompleteID
        },
        data: {
            paymentId: paymentId
        }
    });
    return result;
});
const cancelPaymentIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.items.deleteMany({
        where: {
            orderId: id
        }
    });
    const result = yield prisma.order.delete({
        where: {
            id: id
        }
    });
    return result;
});
exports.paymentService = { paymentSSLCommerce, updatePaymentIntoDB, cancelPaymentIntoDB };
