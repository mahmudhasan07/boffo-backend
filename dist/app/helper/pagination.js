"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationSystem = void 0;
const paginationSystem = (result, req) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const data = result.slice((page - 1) * limit, page * limit);
    const total = result.length;
    const totalPage = Math.round((result === null || result === void 0 ? void 0 : result.length) / limit);
    return { data, limit, page, total, totalPage };
};
exports.paginationSystem = paginationSystem;
