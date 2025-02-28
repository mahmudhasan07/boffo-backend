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
exports.productService = void 0;
const client_1 = require("@prisma/client");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const prisma = new client_1.PrismaClient();
const createProductIntoDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const file = req.files;
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
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
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
    const deleteImage = (imagePath) => {
        const fullPath = path_1.default.join(__dirname, '../../../../uploads', imagePath);
        fs_1.default.unlink(fullPath, (err) => {
            if (err) {
                console.error(`Error deleting file ${imagePath}:`, err);
                return;
            }
        });
    };
    // Delete thumbnail image
    if (product && product.thumbnailImage) {
        deleteImage(product.thumbnailImage);
    }
    // Delete product images
    if (product && product.productImages && product.productImages.length > 0) {
        product.productImages.forEach(deleteImage);
    }
    const result = yield prisma.product.delete({
        where: {
            id
        }
    });
    return result;
});
exports.productService = { createProductIntoDB, getAllProducts, getSingleProduct, deleteProduct };
