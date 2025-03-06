"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderConfirmValidation = void 0;
const zod_1 = require("zod");
exports.orderConfirmValidation = zod_1.z.object({
    paymentId: zod_1.z.string(),
    totalPrice: zod_1.z.number(),
    item: zod_1.z.object({
        productId: zod_1.z.string().min(1, "product id is required"),
        quantity: zod_1.z.number().positive("quantity must be positive"),
        price: zod_1.z.number().positive("quantity must be positive"),
    }),
    info: zod_1.z.object({
        name: zod_1.z.string().min(1, "name required"),
        email: zod_1.z.string().email("email is required"),
        phone: zod_1.z.string().min(10, "phone number is required"),
        address: zod_1.z.string().min(5, "address is required"),
        city: zod_1.z.string().min(2, "city is required"),
        thana: zod_1.z.string().min(2, "thana is required"),
        postCode: zod_1.z.number().min(2, "postCode is required"),
    })
});
