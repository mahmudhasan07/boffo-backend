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
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createOrder = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield prisma.order.create({
        data: {
            paymentId: payload.paymentId,
            userId: id,
            totalPrice: payload.totalPrice,
            info: payload.info, // Ensure info is an object
            items: {
                create: (_a = payload.items) !== null && _a !== void 0 ? _a : [] // Ensure items is an array
            }
        }
    });
    return result;
});
const userOrdersFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.order.findMany({
        where: {
            userId: id
        },
        select: {
            items: {
                select: {
                    quantity: true,
                    price: true,
                    size: true,
                    productDetails: {
                        select: {
                            thumbnailImage: true
                        }
                    }
                }
            },
            paymentId: true,
            totalPrice: true,
            status: true,
            id: true,
            isPayment: true,
            createdAt: true,
            updatedAt: true
        }
    });
    return result;
});
const allOrdersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.order.findMany({
        include: {
            items: {
                include: {
                    productDetails: {
                        select: {
                            name: true,
                            thumbnailImage: true,
                            color: true
                        }
                    }
                }
            }
        }
    });
    const updatedResult = result.map(order => (Object.assign(Object.assign({}, order), { items: order.items.map(item => (Object.assign(Object.assign({}, item), { productDetails: Object.assign(Object.assign({}, item.productDetails), { thumbnailImage: item.productDetails.thumbnailImage
                    ? `${process.env.BASE_URL}/uploads/${item.productDetails.thumbnailImage}`
                    : null }) }))) })));
    return updatedResult;
});
exports.orderService = { createOrder, userOrdersFromDB, allOrdersFromDB };
