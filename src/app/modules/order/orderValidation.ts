import { z } from "zod";

export const orderConfirmValidation = z.object({
    paymentId: z.string(),
    totalPrice: z.number(),
    item: z.array(
        z.object({
            productId: z.string().min(1, "product id is required"),
            quantity: z.number().positive("quantity must be positive"),
            price: z.number().positive("quantity must be positive"),
        })
    ),
    info: z.object({
        name: z.string().min(1, "name required"),
        email: z.string().email("email is required"),
        phone: z.string().min(10, "phone number is required"),
        address: z.string().min(5, "address is required"),
        city: z.string().min(2, "city is required"),
        thana: z.string().min(2, "thana is required"),
        postCode: z.number().min(2, "postCode is required"),
    })
})