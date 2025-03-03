import { PrismaClient } from "@prisma/client";
import ApiError from "../../error/ApiErrors";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();
const createCategoryIntoDB = async (payload: { name: string }) => {

    const findCategory = await prisma.category.findFirst({
        where: {
            name: payload.name
        }
    })
    if (findCategory) {
        throw new ApiError(StatusCodes.CONFLICT, "Category already exists")
    }

    const result = await prisma.category.create({
        data: {
            name: payload.name
        }
    })
    return result
}

const getCategories = async () => {
    const result = await prisma.category.findMany();
    return result;
}

export const categoryService = { createCategoryIntoDB, getCategories }