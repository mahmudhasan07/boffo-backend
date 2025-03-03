"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidation = void 0;
const zod_1 = require("zod");
exports.productValidation = zod_1.z.object({
    name: zod_1.z.string().min(3).max(255),
    price: zod_1.z.number().positive(),
    description: zod_1.z.string().min(3).max(255),
    thumbnailImage: zod_1.z.string().optional(),
    productImages: zod_1.z.array(zod_1.z.string()).optional(),
    color: zod_1.z.string().optional(),
    size: zod_1.z.array(zod_1.z.string()).optional(),
});
