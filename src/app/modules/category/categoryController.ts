import { StatusCodes } from "http-status-codes"
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../middleware/sendResponse"
import { categoryService } from "./categoryService"
import { Request, Response } from "express"

const createCategoryController = catchAsync(async (req: Request, res: Response) => {
    const result = await categoryService.createCategoryIntoDB(req.body)
    sendResponse(res, { statusCode: StatusCodes.CREATED, message: "Category added successfully", data: result, success: true })
})

const getCategoryController = catchAsync(async (req: Request, res: Response) => {
    const result = await categoryService.getCategories()
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Categories fetched successfully", data: result, success: true })
})


export const categoryController = { createCategoryController, getCategoryController }