import { Request, Response, NextFunction } from "express";
import { catchAsyncErrors } from "./catchAsyncErrors";
import jwt, { Secret } from "jsonwebtoken";
import ErrorHandler from "../utils/ErrorHandler";
import redisClient from "../db/redis";

// authenticated user
export const isAuthenticated = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { access_token } = req.cookies;

    if (!access_token)
      return next(
        ErrorHandler.unAuthorized("Please login to access this resource")
      );

    const decoded = jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN_SECRET as Secret
    ) as {
      id: string;
    };

    if (!decoded) {
      return next(ErrorHandler.validationError("Invalid access token"));
    }

    const user = await redisClient.get(decoded.id);

    if (!user) {
      return next(ErrorHandler.notFound("User not found"));
    }

    req.user = JSON.parse(user);

    next();
  }
);

// validate user role
export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role || "")) {
      return next(
        ErrorHandler.unAuthorized(
          `Role: ${req.user?.role} is not allowed to access this resource`
        )
      );
    }
    next();
  };
};
