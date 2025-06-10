import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import { removeImage, uploadImage } from "../utils/cloudinary";
import CourseModel from "../models/course.model";

// upload course
export const uploadCourse = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      const thumbnail = data?.thumbnail;

      if (thumbnail) {
        const { public_id, url } = await uploadImage(thumbnail, "courses");

        data.thumbnail = {
          public_id,
          url,
        };
      }

      const course = await CourseModel.create(data);

      res.send(201).json({
        success: true,
        message: "Course created successfully",
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// edit course
export const editCourse = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId } = req.params;
      const data = req.body;

      let course = await CourseModel.findById(courseId);

      const thumbnail = data?.thumbnail;

      if (thumbnail) {
        if (course?.thumbnail?.public_id) {
          await removeImage(course.thumbnail.public_id);
        }

        const { public_id, url } = await uploadImage(thumbnail, "courses");

        data.thumbnail = {
          public_id,
          url,
        };
      }

      course = await CourseModel.findByIdAndUpdate(
        courseId,
        { $set: data },
        { new: true }
      );

      res.send(201).json({
        success: true,
        message: "Course updated successfully",
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
