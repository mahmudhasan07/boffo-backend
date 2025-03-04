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
exports.productService = void 0;
const client_1 = require("@prisma/client");
const deleteFile_1 = require("../../helper/deleteFile");
const prisma = new client_1.PrismaClient();
const createProductIntoDB = (body, file) => __awaiter(void 0, void 0, void 0, function* () {
    const thumbnailImage = Array.isArray(file) ? null : (file === null || file === void 0 ? void 0 : file.thumbnailImage) ? `${file.thumbnailImage[0].filename}` : null;
    let productImages = [];
    if (!Array.isArray(file) && (file === null || file === void 0 ? void 0 : file.productImages)) {
        productImages = file.productImages.map((image) => `${image.filename}`);
    }
    const product = Object.assign(Object.assign({}, body), { thumbnailImage,
        productImages });
    const result = yield prisma.product.create({
        data: product
    });
    return result;
});
const getAllProducts = (category) => __awaiter(void 0, void 0, void 0, function* () {
    if (category) {
        const products = yield prisma.product.findMany({
            where: {
                category: {
                    equals: category,
                    mode: "insensitive"
                }
            }
        });
        const response = products.map((product) => {
            return Object.assign(Object.assign({}, product), { productImages: product.productImages ? product.productImages.map((image) => `${process.env.BASE_URL}/uploads/${image}`) : null, thumbnailImage: product.thumbnailImage ? `${process.env.BASE_URL}/uploads/${product.thumbnailImage}` : null });
        });
        return response;
    }
    const products = yield prisma.product.findMany();
    const response = products.map((product) => {
        return Object.assign(Object.assign({}, product), { productImages: product.productImages ? product.productImages.map((image) => `${process.env.BASE_URL}/uploads/${image}`) : null, thumbnailImage: product.thumbnailImage ? `${process.env.BASE_URL}/uploads/${product.thumbnailImage}` : null });
    });
    return response;
});
const getSingleProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield prisma.product.findUnique({
        where: {
            id
        }
    });
    return Object.assign(Object.assign({}, product), { productImages: (product === null || product === void 0 ? void 0 : product.productImages) ? product.productImages.map((image) => `${process.env.BASE_URL}/uploads/${image}`) : null, thumbnailImage: (product === null || product === void 0 ? void 0 : product.thumbnailImage) ? `${process.env.BASE_URL}/uploads/${product.thumbnailImage}` : null });
});
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield prisma.product.findUnique({
        where: {
            id
        }
    });
    // Delete thumbnail image
    if (product && product.thumbnailImage) {
        (0, deleteFile_1.deleteImage)(product.thumbnailImage);
    }
    // Delete product images
    if (product && product.productImages && product.productImages.length > 0) {
        product.productImages.forEach(deleteFile_1.deleteImage);
    }
    const result = yield prisma.product.delete({
        where: {
            id
        }
    });
    return result;
});
const updateProduct = (id, body, isFeatures) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.productService = { createProductIntoDB, getAllProducts, getSingleProduct, deleteProduct, updateProduct };
