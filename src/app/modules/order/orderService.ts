import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const createOrder = async (payload: any, id: string) => {
    const result = await prisma.order.create({
        data: {
            ...payload,
            userId: id
        }
    })

    return result
}

const orderService = { createOrder }