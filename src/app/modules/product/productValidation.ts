import { z } from "zod";

export const productValidation = z.object({
    name: z.string().min(3).max(255),
    price: z.number().positive(),
    description: z.string().min(3).max(255),
    thumbnailImage: z.string().optional(),
    productImages: z.array(z.string()).optional(),
    color: z.array(z.string()).optional(),
    size: z.array(z.string()).optional(),
    stock: z.number().positive()

})