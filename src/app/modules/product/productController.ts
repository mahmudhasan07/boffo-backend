import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { productService } from "./productService";
import sendResponse from "../../middleware/sendResponse";
import { StatusCodes } from "http-status-codes";

const productAddController = catchAsync(async (req: Request, res: Response) => {
    const result = await productService.createProductIntoDB(req);
    sendResponse(res, { message: "Product added successfully", data: result, statusCode: StatusCodes.OK, success: true });
})

const productGetController = catchAsync(async (req: Request, res: Response) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const result = await productService.getAllProducts();

    sendResponse(res, { message: "Product fetched successfully", data: result.slice((page - 1) * limit, page * limit), statusCode: StatusCodes.OK, success: true, meta: { limit: limit, page: page, total: result.length, totalPage: Math.round(result?.length / limit) } });
})

const productDeleteController = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await productService.deleteProduct(id);
    sendResponse(res, { message: "Product deleted successfully", data: result, statusCode: StatusCodes.OK, success: true });
})

const productGetSingleController = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await productService.getSingleProduct(id);
    sendResponse(res, { message: "Product fetched successfully", data: result, statusCode: StatusCodes.OK, success: true });
})


export const productController = { productAddController, productGetController, productDeleteController, productGetSingleController }