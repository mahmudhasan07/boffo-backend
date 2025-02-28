import { Router } from "express";
import { fileUploader } from "../../helper/uploadFile";
import { productController } from "./productController";
import { parseBodyMiddleware } from "../../middleware/parseBodyData";
import validateRequest from "../../middleware/validateRequest";
import { productValidation } from "./productValidation";

const route = Router()

route.post("/create", fileUploader.uploadProductImages, parseBodyMiddleware, validateRequest(productValidation), productController.productAddController)
route.get("/", productController.productGetController)
route.get("/:id", productController.productGetSingleController)
route.delete("/:id", productController.productDeleteController)

export const productRoutes = route;