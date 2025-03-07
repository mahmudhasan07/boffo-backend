"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoutes_1 = require("../modules/user/userRoutes");
const authRoutes_1 = require("../modules/auth/authRoutes");
const productRoutes_1 = require("../modules/product/productRoutes");
const categoryRoutes_1 = require("../modules/category/categoryRoutes");
const orderRoutes_1 = require("../modules/order/orderRoutes");
const paymentRoutes_1 = require("../modules/payment/paymentRoutes");
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
    },
    {
        path: "/order",
        component: orderRoutes_1.orderRoutes
    },
    {
        path: "/payment",
        component: paymentRoutes_1.paymentRoutes
    }
];
routes.forEach(route => router.use(route.path, route.component));
exports.default = router;
