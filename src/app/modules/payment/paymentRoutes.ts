import { Router } from "express";
import auth from "../../middleware/auth";
import { Role } from "@prisma/client";
import { paymentController } from "./paymentController";

const route = Router()

route.post("/", auth(Role.USER), paymentController.paymentSSLCommerceController)

export const paymentRoutes = route