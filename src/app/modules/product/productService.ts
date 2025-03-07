import { Gender, PrismaClient, Product } from "@prisma/client";
import { deleteImage } from "../../helper/deleteFile";
import ApiError from "../../error/ApiErrors";
import { StatusCodes } from "http-status-codes";
import { features } from "process";

const prisma = new PrismaClient();

const createProductIntoDB = async (body: any, file: any) => {

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

const getAllProducts = async (feature: string, category: string, gender: Gender) => {

    if (feature == "true") {
        const products = await prisma.product.findMany({
            where: {
                isFeature: true
            },


        })

        const response = products.map((product) => {
            return {
                ...product,
                productImages: product.productImages ? product.productImages.map((image) => `${process.env.BASE_URL}/uploads/${image}`) : null,
                thumbnailImage: product.thumbnailImage ? `${process.env.BASE_URL}/uploads/${product.thumbnailImage}` : null
            }
        })
        return response;
    }

    if (category && gender) {
        const products = await prisma.product.findMany({
            where: {
                category: {
                    equals: category,
                    mode: "insensitive"
                },
                gender: gender
            },


        })

        const response = products.map((product) => {
            return {
                ...product,
                productImages: product.productImages ? product.productImages.map((image) => `${process.env.BASE_URL}/uploads/${image}`) : null,
                thumbnailImage: product.thumbnailImage ? `${process.env.BASE_URL}/uploads/${product.thumbnailImage}` : null
            }
        })
        return response;
    }

    

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

const isFeatureProduct = async (id: string) => {

    const product = await prisma.product.findUnique({
        where: {
            id
        }
    })

    if (product?.isFeature == false) {
        const result = await prisma.product.update({
            where: {
                id
            },
            data: {
                isFeature: true
            }
        })
        return result;
    } else {
        const result = await prisma.product.update({
            where: {
                id
            },
            data: {
                isFeature: false
            }
        })
        return result;
    }



}




export const productService = { createProductIntoDB, getAllProducts, getSingleProduct, deleteProduct, isFeatureProduct }