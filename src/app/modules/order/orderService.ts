import { PrismaClient, ProductStatus } from "@prisma/client"

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
                    productDetails: {
                        select: {
                            thumbnailImage: true
                        }
                    }
                }
            },
            paymentId: true,
            totalPrice: true,
            status: true,
            id: true,
            isPayment: true,
            createdAt: true,
            updatedAt: true



        }
    });

    return result
}

const allOrdersFromDB = async () => {

    const result = await prisma.order.findMany({
        select: {
            id: true,
            paymentId: true,
            status: true,
            totalPrice: true,
            createdAt: true,
            info: true,
            items: {
                select: {
                    orderId: true,
                    quantity: true,
                    size: true,
                    id: true,
                    productDetails: {
                        select: {
                            name: true,
                            thumbnailImage: true,
                            color: true
                        }
                    }
                },

            },
        },
        orderBy: {
            createdAt: "desc"
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

const statusUpdateFormDB = async (payload: { status: string }, id: string) => {

    const result = await prisma.order.update({
        where: {
            id: id
        },
        data: {
            status: payload.status as ProductStatus
        }
    })
    return result

}


export const orderService = { createOrder, userOrdersFromDB, allOrdersFromDB, statusUpdateFormDB }