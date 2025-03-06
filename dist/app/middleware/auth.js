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
const ApiErrors_1 = __importDefault(require("../error/ApiErrors"));
const http_status_codes_1 = require("http-status-codes");
const jwtHelper_1 = require("../helper/jwtHelper");
const client_1 = require("@prisma/client");
const secret_1 = require("../../config/secret");
const prisma = new client_1.PrismaClient();
const auth = (...roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = req.headers.authorization;
            if (!token) {
                throw new ApiErrors_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "You are not authorized!");
            }
            const verifiedUser = jwtHelper_1.jwtHelpers.verifyToken(token, secret_1.jwt_secret);
            if (!(verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.email)) {
                throw new ApiErrors_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "You are not authorized!");
            }
            const { id } = verifiedUser;
            const user = yield prisma.user.findUnique({
                where: {
                    id: id,
                },
            });
            if (!user) {
                throw new ApiErrors_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found!");
            }
            // if (user.isDeleted == true) {
            //   throw new ApiError(httpStatus.BAD_REQUEST, "This user is deleted ! ");
            // }
            if (user.status === client_1.Status.BLOCKED) {
                throw new ApiErrors_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "Your account is blocked!");
            }
            req.user = verifiedUser;
            if (roles.length && !roles.includes(verifiedUser.role)) {
                throw new ApiErrors_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "Forbidden!");
            }
            next();
        }
        catch (err) {
            next(err);
        }
    });
};
exports.default = auth;
