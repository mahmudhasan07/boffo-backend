"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoutes_1 = require("../modules/user/userRoutes");
const authRoutes_1 = require("../modules/auth/authRoutes");
const productRoutes_1 = require("../modules/product/productRoutes");
const categoryRoutes_1 = require("../modules/category/categoryRoutes");
const router = (0, express_1.Router)();
const routes = [
    {
        path: "/user",
        component: userRoutes_1.userRoutes
    },
    {
        path: "/auth",
        component: authRoutes_1.authRoutes
    },
    {
        path: "/product",
        component: productRoutes_1.productRoutes
    },
    {
        path: "/category",
        component: categoryRoutes_1.categoryRoutes
    }
];
routes.forEach(route => router.use(route.path, route.component));
exports.default = router;
