import { Response } from "express";
import { UserModel } from "../models/user.model";

// get user by id
export const getUserById = async (id: string, res: Response) => {
  const user = await UserModel.findById(id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    user,
  });
};
