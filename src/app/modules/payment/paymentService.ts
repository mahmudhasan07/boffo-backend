
// @ts-ignore
import SSLCommerzPayment from "sslcommerz-lts"
import { ObjectId } from "mongodb"
import { ssl_id, ssl_password } from "../../../config/secret"

const store_id = ssl_id
const store_passwd = ssl_password
const is_live = false //true for live, false for sandbox

const paymentSSLCommerce = async (payload: any) => {

    const totalAmount = payload.totalAmount
    const tran_id = new ObjectId().toString()

    const data = {
        total_amount: parseFloat(totalAmount),
        currency: 'BDT',
        tran_id: tran_id, // use unique tran_id for each api call
        success_url: 'http://localhost:3030/success',
        fail_url: 'http://localhost:3030/fail',
        cancel_url: 'http://localhost:3030/cancel',
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: payload.name,
        cus_email: payload.email,
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
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
        return { redirectLink: apiResponse.GatewayPageURL };
    } catch (error) {
        console.error("SSLCommerz Error:", error);
        return { error: "Failed to generate payment link" };
    }

}

export const paymentService = { paymentSSLCommerce }