import { Router } from "express"
import { categoryController } from "./categoryController"

const route = Router()

route.post("/create", categoryController.createCategoryController)
route.get("/", categoryController.getCategoryController)

export const categoryRoutes = route;