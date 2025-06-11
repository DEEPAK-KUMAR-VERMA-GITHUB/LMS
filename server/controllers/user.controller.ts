import ejs from "ejs";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import path from "path";
import redisClient from "../db/redis";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import { IUser, UserModel } from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import {
  accessTokenOptions,
  refreshTokenOptions,
  sendToken,
} from "../utils/jwt";
import sendMail from "../utils/sendMail";
import { removeImage, uploadImage } from "../utils/cloudinary";

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
      return next(ErrorHandler.serverError(error.message));
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

// login user
interface ILoginRequest {
  email: string;
  password: string;
}

export const loginUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as ILoginRequest;

      if (!email || !password) {
        return next(
          ErrorHandler.wrongCredentials("Please enter email and password")
        );
      }

      const user = await UserModel.findOne({ email }).select("+password");

      if (!user) {
        return next(ErrorHandler.wrongCredentials("Invalid credentials"));
      }

      const isPasswordMatched = await user.comparePassword(password);

      if (!isPasswordMatched) {
        return next(ErrorHandler.wrongCredentials("Invalid credentials"));
      }

      await sendToken(user, 200, res);
    } catch (error: any) {
      return next(ErrorHandler.serverError(error.message));
    }
  }
);

// logout user
export const logoutUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.cookie("access_token", "", { maxAge: 1 });
      res.cookie("refresh_token", "", { maxAge: 1 });

      // remove from redis
      await redisClient.del(req.user?._id as string);

      res.status(200).json({
        success: true,
        message: "User logged out successfully",
      });
    } catch (error: any) {
      return next(ErrorHandler.serverError(error.message));
    }
  }
);

// update access token
export const updateAccessToken = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refresh_token } = req.cookies;

      if (!refresh_token) {
        return next(
          new ErrorHandler("Please login to access this resource", 400)
        );
      }

      const decoded = jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN_SECRET as string
      ) as JwtPayload;

      if (!decoded) {
        return next(
          ErrorHandler.unAuthorized("Please login to access this resource")
        );
      }

      const message = "Cookie has been refreshed";

      const session = await redisClient.get(decoded.id as string);
      if (!session) {
        return next(new ErrorHandler("Session expired", 400));
      }

      const user = JSON.parse(session);

      const accessToken = jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN_SECRET as Secret,
        {
          expiresIn: "5m",
        }
      );
      const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN_SECRET as Secret,
        {
          expiresIn: "3d",
        }
      );

      res.cookie("access_token", accessToken, accessTokenOptions);
      res.cookie("refresh_token", refreshToken, refreshTokenOptions);

      req.user = user;

      res.status(200).json({
        success: true,
        message,
        accessToken,
      });
    } catch (error: any) {
      return next(ErrorHandler.serverError(error.message));
    }
  }
);

// get user info
export const getUserInfo = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id as string;

      const user = await redisClient.get(userId);

      if (!user) {
        return next(ErrorHandler.notFound("User not found"));
      }

      res.status(200).json({
        success: true,
        user: JSON.parse(user),
      });
    } catch (error: any) {
      return next(ErrorHandler.serverError(error.message));
    }
  }
);

// social auth
interface ISocialAuthBody {
  email: string;
  name: string;
  avatar: string;
}

export const socialAuth = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name, avatar } = req.body as ISocialAuthBody;
      const user = await UserModel.findOne({ email });

      if (!user) {
        const newUser = await UserModel.create({ email, name, avatar });
        await sendToken(newUser, 201, res);
      } else {
        await sendToken(user, 200, res);
      }
    } catch (error: any) {
      return next(ErrorHandler.serverError(error.message));
    }
  }
);

// update user info
interface IUpdateUserInfo {
  name?: string;
}

export const updateUserInfo = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.body as IUpdateUserInfo;
      const userId = req.user?._id;

      const user = await UserModel.findById(userId);

      if (!user) {
        return next(ErrorHandler.notFound("User not found"));
      }

      if (name) {
        user.name = name;
      }

      await user.save();

      await redisClient.set(userId as string, JSON.stringify(user));

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error: any) {
      return next(ErrorHandler.serverError(error.message));
    }
  }
);

// update user password
interface IUpdatePasswordBody {
  oldPassword: string;
  newPassword: string;
}

export const updatePassword = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { oldPassword, newPassword } = req.body as IUpdatePasswordBody;

      if (!oldPassword || !newPassword) {
        return next(
          ErrorHandler.validationError("Please enter old and new password")
        );
      }

      const user = await UserModel.findById(req.user?._id).select("+password");

      if (!user) {
        return next(ErrorHandler.notFound("User not found"));
      }

      if (!!!user.password) {
        return next(ErrorHandler.wrongCredentials("Invalid credentials"));
      }

      const isPasswordMatched = await user.comparePassword(oldPassword);

      if (!isPasswordMatched) {
        return next(ErrorHandler.wrongCredentials("Invalid credentials"));
      }

      user.password = newPassword;

      await user.save();

      res.status(201).json({
        success: true,
        user,
        message: "Password updated successfully",
      });
    } catch (error: any) {
      return next(ErrorHandler.serverError(error.message));
    }
  }
);

// update profile picture
interface IUpdateProfilePicture {
  avatar: string;
}

export const updateProfilePicture = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { avatar } = req.body;

      const user = await UserModel.findById(req.user?._id);

      if (!user) {
        return next(ErrorHandler.notFound("User not found"));
      }

      if (avatar) {
        if (user.avatar?.public_id) {
          await removeImage(user.avatar.public_id);
        }

        const { public_id, url } = await uploadImage(avatar, "avatar", true);
        user.avatar = { public_id, url };

        await user.save();

        await redisClient.set(user._id as string, JSON.stringify(user));
      }

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error: any) {
      return next(ErrorHandler.serverError(error.message));
    }
  }
);

// get all users -- admin only
export const getAllUsers = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await UserModel.find().sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        users,
      });
    } catch (error: any) {
      return next(ErrorHandler.serverError(error.message));
    }
  }
);

// update user role -- only admin
export const updateUserRole = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, role } = req.body;

      const user = await UserModel.findByIdAndUpdate(
        id,
        { role },
        { new: true }
      );

      if (!user) {
        return next(ErrorHandler.notFound("User not found"));
      }

      await redisClient.del(id);

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error: any) {
      return next(ErrorHandler.serverError(error.message));
    }
  }
);

// delete user -- only admin
export const deleteUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const user = await UserModel.findById(id);

      if (!user) {
        return next(ErrorHandler.notFound("User not found"));
      }

      await user.deleteOne({ id });

      await redisClient.del(id);

      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error: any) {
      return next(ErrorHandler.serverError(error.message));
    }
  }
);
