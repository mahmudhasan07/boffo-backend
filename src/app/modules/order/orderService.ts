import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const createOrder = async (payload: any, id: string) => {

    const result = await prisma.order.create({
        data: {
            paymentId: payload.paymentId,
            userId: id,
            totalPrice: payload.totalPrice,
            info: payload.info, // Ensure info is an object
            items: {
                create: payload.items ?? [] // Ensure items is an array
            }
        }
    });

    return result;
};


const userOrdersFromDB = async (id: string) => {

    const result = await prisma.order.findMany({
        where: {
            userId: id
        }
    });

    return result
}

const allOrdersFromDB = async () => {

    const result = await prisma.order.findMany({
        include:{
            items : true
        }
    });

    return result
}


export const orderService = { createOrder, userOrdersFromDB, allOrdersFromDB }