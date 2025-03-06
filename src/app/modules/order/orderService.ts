import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const createOrder = async (payload: any, id: string) => {
    console.log("Payload:", JSON.stringify(payload, null, 2));
    console.log("User ID:", id);

    // Ensure required fields exist
    if (!payload?.paymentId || !id || !payload?.totalPrice) {
        throw new Error("Missing required order data.");
    }

    // if (!payload.items || !Array.isArray(payload.items) || payload.items.length === 0) {
    //     throw new Error("Order must have at least one item.");
    // }

    const parsedInfo = typeof payload.info === "string" ? JSON.parse(payload.info) : payload.info;

    const result = await prisma.order.create({
        data: {
            paymentId: payload.paymentId,
            userId: id,
            totalPrice: payload.totalPrice,
            info: parsedInfo ?? {}, // Ensure info is an object
            items: {
                create: payload.items ?? [] // Ensure items is an array
            }
        }
    });

    return result;
};


export const orderService = { createOrder }