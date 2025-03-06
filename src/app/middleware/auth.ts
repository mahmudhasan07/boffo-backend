import { NextFunction, Request, Response } from "express";
import { JwtPayload, Secret } from "jsonwebtoken";
import ApiError from "../error/ApiErrors";
import { StatusCodes } from "http-status-codes";
import { jwtHelpers } from "../helper/jwtHelper";
import { PrismaClient, Role, Status } from "@prisma/client";
import { jwt_secret } from "../../config/secret";


const prisma = new PrismaClient()

const auth = (...roles: Role[]) => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "You are not authorized!");
      }

      const verifiedUser = jwtHelpers.verifyToken(
        token,
        jwt_secret as Secret
      );

      if (!verifiedUser?.email) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "You are not authorized!");
      }
      const { id } = verifiedUser;

      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, "User not found!");
      }

      // if (user.isDeleted == true) {
      //   throw new ApiError(httpStatus.BAD_REQUEST, "This user is deleted ! ");
      // }

      if (user.status === Status.BLOCKED) {
        throw new ApiError(StatusCodes.FORBIDDEN, "Your account is blocked!");
      }

      req.user = verifiedUser as JwtPayload;

      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new ApiError(StatusCodes.FORBIDDEN, "Forbidden!");
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
