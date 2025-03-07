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
const store_id = secret_1.ssl_id;
const store_passwd = secret_1.ssl_password;
const is_live = false; //true for live, false for sandbox
const paymentSSLCommerce = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const totalAmount = payload.totalAmount;
    const tran_id = new mongodb_1.ObjectId().toString();
    const data = {
        total_amount: parseFloat(totalAmount),
        currency: 'BDT',
        tran_id: tran_id, // use unique tran_id for each api call
        success_url: 'http://localhost:3030/success',
        fail_url: 'http://localhost:3030/fail',
        cancel_url: 'http://localhost:3030/cancel',
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: payload.name,
        cus_email: payload.email,
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
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
        return { redirectLink: apiResponse.GatewayPageURL };
    }
    catch (error) {
        console.error("SSLCommerz Error:", error);
        return { error: "Failed to generate payment link" };
    }
});
exports.paymentService = { paymentSSLCommerce };
