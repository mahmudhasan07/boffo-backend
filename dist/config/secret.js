"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ssl_password = exports.ssl_id = exports.jwt_secret = exports.prot = void 0;
require("dotenv/config");
exports.prot = process.env.PORT;
exports.jwt_secret = process.env.TOKEN_SECRET;
exports.ssl_id = process.env.SSLCOMERCE_ID;
exports.ssl_password = process.env.SSLCOMERCE_PASSWORD;
