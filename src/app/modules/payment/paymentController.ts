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



    // const payload = { body, name: userInfo?.name, email: userInfo?.email }
    const id = userInfo?.id
    const result = await paymentService.paymentSSLCommerce(body, id)

    sendResponse(res, { statusCode: StatusCodes.ACCEPTED, message: "Payment successfully completed", success: true, data: result })

})


const updatePaymentController = catchAsync(async (req: Request, res: Response) => {
    const paymentId = req.query?.tran_id
    const body = req?.body
    console.log(paymentId);

    const result = await paymentService.updatePaymentIntoDB(paymentId)
    if (result) {
        res.redirect(`${process.env.WEB_URL}/success`)

    }
})
const cancelPaymentController = catchAsync(async (req: Request, res: Response) => {

    const result = await paymentService.cancelPaymentIntoDB()
    if (result) {
        res.redirect(`${process.env.WEB_URL}/cancel`)
    }
})
const failPaymentController = catchAsync(async (req: Request, res: Response) => {

    const result = await paymentService.cancelPaymentIntoDB()
    if (result) {
        res.redirect(`${process.env.WEB_URL}/cancel`)

    }
})



export const paymentController = { paymentSSLCommerceController, updatePaymentController, cancelPaymentController, failPaymentController }