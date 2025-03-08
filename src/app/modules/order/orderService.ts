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
        },
        select: {
            items: {
                select: {
                    quantity: true,
                    price: true,
                    size: true,
                    productDetails: true
                }
            },
            paymentId: true,
            totalPrice: true,
            status: true,
            id: true,
            isPayment: true



        }
    });

    return result
}

const allOrdersFromDB = async () => {

    const result = await prisma.order.findMany({
        include: {
            items: {
                include: {
                    productDetails: {
                        select: {
                            name: true,
                            thumbnailImage: true,
                            color: true
                        }
                    }
                }
            }
        }
    });

    const updatedResult = result.map(order => ({
        ...order,
        items: order.items.map(item => ({
            ...item,
            productDetails: {
                ...item.productDetails,
                thumbnailImage: item.productDetails.thumbnailImage
                    ? `${process.env.BASE_URL}/uploads/${item.productDetails.thumbnailImage}`
                    : null
            }
        }))
    }));

    return updatedResult
}


export const orderService = { createOrder, userOrdersFromDB, allOrdersFromDB }