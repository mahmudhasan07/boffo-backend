import { Gender, PrismaClient } from "@prisma/client";
import ApiError from "../../error/ApiErrors";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();
const createCategoryIntoDB = async (payload: { name: string, gender: Gender }) => {

    const findCategory = await prisma.category.findFirst({
        where: {
            name: payload.name,
            gender: payload.gender as Gender
        }
    })
    if (findCategory) {
        throw new ApiError(StatusCodes.CONFLICT, "Category already exists")
    }

    const result = await prisma.category.create({
        data: {
            ...payload
        }
    })
    return result
}

const getCategories = async (gender: string) => {

    if (gender) {
        const result = await prisma.category.findMany({
            where: {
                gender: gender.toUpperCase() as Gender
            }
        });
        return result;
    }
    const result = await prisma.category.findMany();
    return result;

}

export const categoryService = { createCategoryIntoDB, getCategories }