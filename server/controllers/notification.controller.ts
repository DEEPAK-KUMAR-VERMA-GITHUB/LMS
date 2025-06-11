import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import NotificationModel from "../models/notification.model";
import cron from "node-cron";

// get notifications -- only admin
export const getNotifications = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notifications = await NotificationModel.find().sort({
        createdAt: -1,
      });
      res.status(200).json({
        success: true,
        notifications,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// update notification status -- only admin
export const updateNotification = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { notificationId } = req.params;

      const notification = await NotificationModel.findById(notificationId);
      if (!notification) {
        return next(ErrorHandler.notFound("Notification not found"));
      }
      notification.status = "read";
      await notification.save();

      getNotifications(req, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// delete read notifications of previous 30 days
cron.schedule("0 0 0 * * *", async () => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  await NotificationModel.deleteMany({
    status: "read",
    createdAt: { $lt: thirtyDaysAgo },
  });
  console.log("Deleted read notifications");
});
