import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { orderService } from "./orderService";
import { decode } from "jsonwebtoken";
import sendResponse from "../../middleware/sendResponse";
import { StatusCodes } from "http-status-codes";


const createOrderController = catchAsync(async (req: Request, res: Response) => {
    const body = req.body
    const token = req.headers.authorization as any
    const { id } = decode(token) as { id: string }
    const result = await orderService.createOrder(body, id)
    sendResponse(res, { statusCode: StatusCodes.CREATED, message: "Order successfully created", success: true, data: result })
})

export const orderController = { createOrderController }