import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import OrderModel, { IOrder } from "../models/order.model";
import { UserModel } from "../models/user.model";
import CourseModel from "../models/course.model";
import path from "path";
import ejs, { name } from "ejs";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notification.model";
import redisClient from "../db/redis";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// create order
export const createOrder = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, payment_info }: IOrder = req.body;

      if (payment_info) {
        if ("id" in payment_info) {
          const paymentIntentId = payment_info.id;
          const paymentIntent = await stripe.paymentIntents.retrieve(
            paymentIntentId
          );
          if (paymentIntent.status !== "succeeded") {
            return next(new ErrorHandler("Payment not authorized", 400));
          }
        }
      }

      const user = await UserModel.findById(req.user?._id);

      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      const courseExistInUser = user?.courses.some(
        (course: any) => course._id.toString() === courseId
      );

      if (courseExistInUser) {
        return next(
          new ErrorHandler("You have already purchased this course", 400)
        );
      }

      const course: any = await CourseModel.findById(courseId);

      if (!course) {
        return next(ErrorHandler.notFound("Course not found"));
      }

      const orderData: any = {
        courseId: course._id,
        userId: user?._id,
        payment_info,
      };

      const order = await OrderModel.create(orderData);

      const mailData = {
        order: {
          _id: course?._id.toString().slice(0, 6),
          name: course.name,
          price: course.price,
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
      };

      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/order-confirmation.ejs"),
        { order: mailData }
      );

      try {
        if (user) {
          await sendMail({
            email: user.email,
            subject: "Order Confirmation",
            template: "order-confirmation.ejs",
            data: mailData,
          });
        }
      } catch (error: any) {
        return next(ErrorHandler.serverError(error.message));
      }

      user?.courses.push(course?._id.toString());

      if (course) {
        course.purchased! += 1;
        await course.save();

        // remove this course from redis
        await redisClient.del(courseId);
      }

      await user?.save();

      await redisClient.set(req.user?._id, JSON.stringify(user) as any);

      await NotificationModel.create({
        userId: user?._id,
        title: "New Order",
        message: `You have a new order from ${course?.name}`,
      });

      res.status(201).json({
        success: true,
        message: "Order created successfully.",
        order,
      });
    } catch (error: any) {
      return next(ErrorHandler.serverError(error.message));
    }
  }
);

// get all orders -- admin only
export const getAllOrders = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await OrderModel.find().sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error: any) {
      return next(ErrorHandler.serverError(error.message));
    }
  }
);

// send stripe publishable key
export const sendStripePublishableKey = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      success: true,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  }
);

// new payment
export const newPayment = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "INR",
        metadata: {
          company: "LMS",
        },
        automatic_payment_methods: {
          enabled: true,
        },
        description: "For LMS Course Purchase",
        receipt_email: req.user?.email,
        shipping: {
          name: req.user?.name,
          address: {
            line1: "510 Townsend St",
            postal_code: "98140",
            city: "San Francisco",
            state: "CA",
            country: "US",
          },
        },
      });

      res.status(201).json({
        success: true,
        client_secret: myPayment.client_secret,
      });
    } catch (error) {
      return next(ErrorHandler.serverError(error.message));
    }
  }
);

//br31af6232
