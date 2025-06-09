import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import { IUser, UserModel } from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { Secret } from "jsonwebtoken";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";

// register user
interface IRegistrationBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export const registerUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    const isEmailExist = await UserModel.findOne({ email });

    if (isEmailExist)
      return next(ErrorHandler.conflict("Email already exists"));

    const user: IRegistrationBody = {
      name,
      email,
      password,
    };

    const activationToken = createActivationToken(user);
    const activationCode = activationToken.activationCode;

    const data = { user: { name: user.name }, activationCode };

    try {
      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/activation-mail.ejs"),
        data
      );

      await sendMail({
        email: user.email,
        subject: "Activate your account",
        template: "activation-mail.ejs",
        data,
      });

      res.status(201).json({
        success: true,
        message: `Please check your email: ${user.email} to activate your account`,
        activationToken: activationToken.token,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

interface IActivationToken {
  token: string;
  activationCode: string;
}

export const createActivationToken = (user: any): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
  const token = jwt.sign(
    {
      user,
      activationCode,
    },
    process.env.ACTIVATION_SECRET as Secret,
    {
      expiresIn: "5m",
    }
  );

  return { token, activationCode };
};

// activate user
interface IActivationRequest {
  activation_token: string;
  activation_code: string;
}

export const activateUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { activation_token, activation_code } =
      req.body as IActivationRequest;

    const newUser: { user: IUser; activationCode: string } = jwt.verify(
      activation_token,
      process.env.ACTIVATION_SECRET as string
    ) as { user: IUser; activationCode: string };

    if (newUser.activationCode !== activation_code) {
      return next(ErrorHandler.wrongCredentials("Invalid activation code"));
    }

    const { name, email, password } = newUser.user;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return next(ErrorHandler.conflict("User already exists"));
    }

    const user = await UserModel.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      user,
      message: "User created successfully",
    });
  }
);
