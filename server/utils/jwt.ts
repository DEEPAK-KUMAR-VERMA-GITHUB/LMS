import dotenv from "dotenv";
import { Response } from "express";
import { IUser } from "../models/user.model";
import redisClient from "../db/redis";

export interface ITokenOptions {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none" | undefined;
  secure?: boolean;
}

const accessExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || "300", 10);
const refreshExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRE || "1200", 10);

// options for cookies
export const accessTokenOptions: ITokenOptions = {
  expires: new Date(Date.now() + accessExpire * 60 * 1000),
  maxAge: accessExpire * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
};

export const refreshTokenOptions: ITokenOptions = {
  expires: new Date(Date.now() + refreshExpire * 24 * 60 * 60 * 1000),
  maxAge: refreshExpire * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
};

export const sendToken = async (
  user: IUser,
  statusCode: number,
  res: Response
) => {
  const accessToken = user.SignAccessToken();
  const refreshToken = user.SignRefreshToken();

  // upload session to redis if available
  if (redisClient) {
    try {
      await redisClient?.set(user._id, JSON.stringify(user) as any);
    } catch (error) {
      console.warn('Failed to store user session in Redis:', error);
    }
  }

  // only set secure to true in production
  if (process.env.NODE_ENV === "production") {
    accessTokenOptions.secure = true;
  }

  res.cookie("access_token", accessToken, accessTokenOptions);
  res.cookie("refresh_token", refreshToken, refreshTokenOptions);

  res.status(statusCode).json({
    success: true,
    user,
    accessToken,
  });
};
