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
exports.categoryService = void 0;
const client_1 = require("@prisma/client");
const ApiErrors_1 = __importDefault(require("../../error/ApiErrors"));
const http_status_codes_1 = require("http-status-codes");
const prisma = new client_1.PrismaClient();
const createCategoryIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const findCategory = yield prisma.category.findFirst({
        where: {
            name: payload.name
        }
    });
    if (findCategory) {
        throw new ApiErrors_1.default(http_status_codes_1.StatusCodes.CONFLICT, "Category already exists");
    }
    const result = yield prisma.category.create({
        data: {
            name: payload.name
        }
    });
    return result;
});
const getCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.category.findMany();
    return result;
});
exports.categoryService = { createCategoryIntoDB, getCategories };
