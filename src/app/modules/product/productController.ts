import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { productService } from "./productService";
import sendResponse from "../../middleware/sendResponse";
import { StatusCodes } from "http-status-codes";
import { paginationSystem } from "../../helper/pagination";

const productAddController = catchAsync(async (req: Request, res: Response) => {
    const body = req.body;
    const file = req.files
    const result = await productService.createProductIntoDB(body, file);
    sendResponse(res, { message: "Product added successfully", data: result, statusCode: StatusCodes.OK, success: true });
})

const productGetController = catchAsync(async (req: Request, res: Response) => {
    const category = req.query.category as string;
    const gender = req.query.gender as any
    const feature = req.query.isFeature as string;


    const result = await productService.getAllProducts(feature, category, gender.toUpperCase());
    const { data, limit, page, total, totalPage } = paginationSystem(result, req);

    sendResponse(res, { message: "Product fetched successfully", data: data, statusCode: StatusCodes.OK, success: true, meta: { limit: limit, page: page, total: total, totalPage: totalPage } });
})

// const featureProductController = catchAsync(async(req: Request, res: Response)=>{
//     const result = await productService.getAllProducts();
// })

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


const productFeatureProductController = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await productService.isFeatureProduct(id);
    sendResponse(res, { message: "Product updated successfully", data: result, statusCode: StatusCodes.OK, success: true });
})


export const productController = { productAddController, productGetController, productDeleteController, productGetSingleController, productFeatureProductController }