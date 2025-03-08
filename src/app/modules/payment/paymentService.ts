
// @ts-ignore
import SSLCommerzPayment from "sslcommerz-lts"
import { ObjectId } from "mongodb"
import { ssl_id, ssl_password } from "../../../config/secret"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const store_id = ssl_id
const store_passwd = ssl_password
const is_live = false //true for live, false for sandbox

let paymentCompleteID: string | undefined

const paymentSSLCommerce = async (payload: any, id: string) => {

    const result = await prisma.order.create({
        data: {
            userId: id,
            totalPrice: payload.totalPrice,
            info: payload.info, // Ensure info is an object
            items: {
                create: payload.items ?? [] // Ensure items is an array
            }
        }
    });
    
    paymentCompleteID = result?.id

    const tran_id = new ObjectId().toString()

    const data = {
        total_amount: parseFloat(payload?.totalAmount),
        currency: 'BDT',
        tran_id: tran_id, // use unique tran_id for each api call
        success_url: `${process.env?.BASE_URL}/success`,
        fail_url: `${process.env?.BASE_URL}/fail`,
        cancel_url: `${process.env?.BASE_URL}/cancel`,
        ipn_url: `${process.env?.BASE_URL}/ipn`,
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: payload?.info.name,
        cus_email: payload?.info.email,
        cus_add1: payload?.info.address,
        cus_add2: 'Dhaka',
        cus_city: payload?.info.city,
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: payload?.info.phone,
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };

    try {
        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
        const apiResponse = await sslcz.init(data);
        console.log(apiResponse.GatewayPageURL);
        
        if (result && apiResponse.GatewayPageURL) {

            return { redirectLink: apiResponse.GatewayPageURL };
        }
    } catch (error) {
        console.error("SSLCommerz Error:", error);
        return { error: "Failed to generate payment link" };
    }

}


const updatePaymentIntoDB = async (payload: any) => {
    console.log(payload, paymentCompleteID);

}

export const paymentService = { paymentSSLCommerce, updatePaymentIntoDB }