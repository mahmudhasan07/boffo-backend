import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { orderService } from "./orderService";
import { decode } from "jsonwebtoken";
import sendResponse from "../../middleware/sendResponse";
import { StatusCodes } from "http-status-codes";
import { paginationSystem } from "../../helper/pagination";


const createOrderController = catchAsync(async (req: Request, res: Response) => {
    const body = req.body
    const token = req.headers.authorization as any
    const { id } = decode(token) as { id: string }
    const result = await orderService.createOrder(body, id)
    sendResponse(res, { statusCode: StatusCodes.CREATED, message: "Order successfully created", success: true, data: result })
})

const userOrdersController = catchAsync(async (req: Request, res: Response) => {
    const token = req.headers.authorization as any
    const { id } = decode(token) as { id: string }
    const result = await orderService.userOrdersFromDB(id)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Orders fetched successfully", success: true, data: result })
})

const adminOrdersController = catchAsync(async (req: Request, res: Response) => {

    const result = await orderService.allOrdersFromDB()
    const { data, limit, page, total, totalPage } = paginationSystem(result, req)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Orders fetched successfully", success: true, data: data, meta: { limit: limit, page: page, total: total, totalPage: totalPage } })
})

const adminStatusController = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id
    const body = req.body
    const result = await orderService.statusUpdateFormDB(body, id)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Orders fetched successfully", success: true, data: result })

})

export const orderController = { createOrderController, adminOrdersController, userOrdersController, adminStatusController }