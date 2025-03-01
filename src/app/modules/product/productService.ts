import { PrismaClient, Product } from "@prisma/client";
import { Request } from "express";
import { deleteImage } from "../../helper/deleteFile";

const prisma = new PrismaClient();

const createProductIntoDB = async (req: Request) => {
    const body = req.body;
    const file = req.files

    const thumbnailImage = Array.isArray(file) ? null : file?.thumbnailImage ? `${file.thumbnailImage[0].filename}` : null;
    let productImages: string[] = [];
    if (!Array.isArray(file) && file?.productImages) {
        productImages = file.productImages.map((image: any) => `${image.filename}`);
    }



    const product: Product = {
        ...body,
        thumbnailImage,
        productImages
    }

    const result = await prisma.product.create({
        data: product
    })

    return result;



}

const getAllProducts = async () => {
    const products = await prisma.product.findMany();
    const response = products.map((product) => {
        return {
            ...product,
            productImages: product.productImages ? product.productImages.map((image) => `${process.env.BASE_URL}/uploads/${image}`) : null,
            thumbnailImage: product.thumbnailImage ? `${process.env.BASE_URL}/uploads/${product.thumbnailImage}` : null
        }
    })
    return response;
}

const getSingleProduct = async (id: string) => {
    const product = await prisma.product.findUnique({
        where: {
            id
        }
    })
    return { ...product, productImages: product?.productImages ? product.productImages.map((image) => `${process.env.BASE_URL}/uploads/${image}`) : null, thumbnailImage: product?.thumbnailImage ? `${process.env.BASE_URL}/uploads/${product.thumbnailImage}` : null };
}

const deleteProduct = async (id: string) => {
    const product = await prisma.product.findUnique({
        where: {
            id
        }
    })



    // Delete thumbnail image
    if (product && product.thumbnailImage) {
        deleteImage(product.thumbnailImage);
    }

    // Delete product images
    if (product && product.productImages && product.productImages.length > 0) {
        product.productImages.forEach(deleteImage);
    }

    const result = await prisma.product.delete({
        where: {
            id
        }
    })
    return result;
}


export const productService = { createProductIntoDB, getAllProducts, getSingleProduct, deleteProduct }