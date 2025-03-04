import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { UserValidation } from "./userValidation";
import { userController } from "./userController";
import auth from "../../middleware/auth";
import { Role } from "@prisma/client";

const route = Router()

route.post('/create', validateRequest(UserValidation), userController.createUserController)
route.get("/", userController.getAllUsersController)
route.post("/verifyOTP", userController.OTPVerifyController)
route.patch("/update-password", userController.updatePasswordController)
route.put('/update', auth(Role.USER), userController.updateUserController)


export const userRoutes = route