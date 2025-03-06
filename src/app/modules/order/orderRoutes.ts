import { Router } from "express";
import auth from "../../middleware/auth";
import { Role } from "@prisma/client";
import { orderController } from "./orderController";

const route = Router()

route.post('/create', auth(Role.USER), orderController.createOrderController)


export const orderRoutes = route