import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { decode } from "jsonwebtoken";
import { paymentService } from "./paymentService";
import sendResponse from "../../middleware/sendResponse";
import { StatusCodes } from "http-status-codes";

const paymentSSLCommerceController = catchAsync(async (req: Request, res: Response) => {

    const token = req.headers.authorization as any
    const body = req.body
    const userInfo = decode(token) as any

    console.log(body);


    const payload = { totalAmount: body.totalAmount, name: userInfo?.name, email: userInfo?.email }

    const result = await paymentService.paymentSSLCommerce(payload)
    console.log(result);

    sendResponse(res, { statusCode: StatusCodes.ACCEPTED, message: "Payment successfully completed", success: true, data: result })

})

export const paymentController = { paymentSSLCommerceController }