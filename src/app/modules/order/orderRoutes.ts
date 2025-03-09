import { Router } from "express";
import auth from "../../middleware/auth";
import { Role } from "@prisma/client";
import { orderController } from "./orderController";
import validateRequest from "../../middleware/validateRequest";
import { orderConfirmValidation } from "./orderValidation";

const route = Router()

route.post('/create', auth(Role.USER), validateRequest(orderConfirmValidation), orderController.createOrderController)

route.get("/my-orders", auth(Role.USER), orderController.userOrdersController)

route.get("/", auth(Role.ADMIN), orderController.adminOrdersController)

route.patch("/status/:id", auth(Role.ADMIN), orderController.adminStatusController)


export const orderRoutes = route