import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import { removeImage, uploadImage } from "../utils/cloudinary";
import CourseModel from "../models/course.model";
import redisClient from "../db/redis";
import mongoose from "mongoose";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notification.model";
import axios from "axios";

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

      // clear courses from redis
      await redisClient.del("allCourses");

      res.status(201).json({
        success: true,
        message: "Course created successfully",
        course,
      });
    } catch (error: any) {
      return next(ErrorHandler.serverError(error.message));
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

      // clear all courses from redis
      await redisClient.del("allCourses");

      res.status(201).json({
        success: true,
        message: "Course updated successfully",
        course,
      });
    } catch (error: any) {
      return next(ErrorHandler.serverError(error.message));
    }
  }
);

// get single course -- without purchasing
export const getSingleCourse = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId } = req.params;

      // check if course cache exists in redis
      const isCacheExists = await redisClient.get(courseId);

      if (isCacheExists) {
        const course = JSON.parse(isCacheExists);
        return res.status(200).json({
          success: true,
          course,
        });
      } else {
        const course = await CourseModel.findById(courseId).select(
          "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
        );

        if (!course) {
          return next(ErrorHandler.notFound("Course not found"));
        }

        // put course in redis
        await redisClient.set(courseId, JSON.stringify(course), "EX", 604800);

        res.status(200).json({
          success: true,
          course,
        });
      }
    } catch (error: any) {
      return next(ErrorHandler.serverError(error.message));
    }
  }
);

// get all courses -- without purchasing
export const getAllCourses = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isCacheExists = await redisClient.get("allCourses");

      if (isCacheExists) {
        return res.status(200).json({
          success: true,
          courses: JSON.parse(isCacheExists),
        });
      } else {
        const courses = await CourseModel.find().select(
          "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
        );

        await redisClient.set(
          "allCourses",
          JSON.stringify(courses),
          "EX",
          604800
        );

        res.status(200).json({
          success: true,
          courses,
        });
      }
    } catch (error: any) {
      return next(ErrorHandler.serverError(error.message));
    }
  }
);

// get course content -- only for purchased valid user
export const getCourseByUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId } = req.params;

      const courseList = req.user?.courses;

      const courseExists = courseList?.find(
        (course: any) => course._id.toString() === courseId
      );

      if (!courseExists) {
        return next(
          ErrorHandler.unAuthorized(
            "You are not eligible to access this course"
          )
        );
      }

      const course = await CourseModel.findById(courseId);

      const content = course?.courseData;

      res.status(200).json({
        success: true,
        content,
      });
    } catch (error: any) {
      return next(ErrorHandler.serverError(error.message));
    }
  }
);

// add question in course
interface IAddQuestionData {
  question: string;
  courseId: string;
  contentId: string;
}

export const addQuestion = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { question, contentId, courseId }: IAddQuestionData = req.body;
      const course = await CourseModel.findById(courseId);

      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return next(ErrorHandler.validationError("Invalid content ID"));
      }

      const courseContent = course?.courseData.find((item: any) =>
        item._id.equals(contentId)
      );

      if (!courseContent) {
        return next(ErrorHandler.validationError("Invalid content ID"));
      }

      // create a new question
      const newQuestion: any = {
        user: req.user,
        question,
        questionReplies: [],
      };

      // add this question to course content
      courseContent.questions.push(newQuestion);

      await NotificationModel.create({
        user: req.user?._id,
        title: "New Question",
        message: `You have a new question in ${courseContent?.title}`,
      });

      // save the updated course
      await course?.save();

      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(ErrorHandler.serverError(error.message));
    }
  }
);

// add answer in course question
interface IAddAnswerData {
  answer: string;
  courseId: string;
  contentId: string;
  questionId: string;
}

export const addAnswer = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { answer, courseId, contentId, questionId }: IAddAnswerData =
        req.body;

      const course = await CourseModel.findById(courseId);

      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return next(ErrorHandler.validationError("Invalid content ID"));
      }

      const courseContent = course?.courseData.find((item: any) =>
        item._id.equals(contentId)
      );

      if (!courseContent) {
        return next(ErrorHandler.validationError("Invalid content ID"));
      }

      const question = courseContent?.questions?.find((item: any) =>
        item._id.equals(questionId)
      );

      if (!question) {
        return next(ErrorHandler.validationError("Invalid question ID"));
      }

      // create a new answer
      const newAnswer: any = {
        user: req.user,
        answer,
      };

      // add this answer to question replies
      question?.questionReplies?.push(newAnswer);

      // save the updated course
      await course?.save();

      if (req.user?._id === question.user?._id) {
        await NotificationModel.create({
          user: req.user?._id,
          title: "New Reply Received",
          message: `You have a new reply in ${courseContent.title}`,
        });
      } else {
        const data = {
          name: question.user.name,
          title: courseContent.title,
        };

        const html = await ejs.renderFile(
          path.join(__dirname, "../mails/question-reply.ejs"),
          data
        );

        try {
          await sendMail({
            email: question.user.email,
            subject: "Qustion Reply",
            template: "question-reply.ejs",
            data,
          });
        } catch (error: any) {
          return next(ErrorHandler.serverError(error.message));
        }
      }

      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(ErrorHandler.serverError(error.message));
    }
  }
);

// add review in course
interface IAddReviewData {
  review: string;
  courseId: string;
  rating: number;
  userId: string;
}

export const addReview = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCourseList = req.user?.courses;

      const { courseId } = req.params;

      // if course id is not valid
      if (!mongoose.Types.ObjectId.isValid(courseId)) {
        return next(ErrorHandler.validationError("Invalid course ID"));
      }

      // check if course exists in userCoursesList
      const courseExists = userCourseList?.some(
        (course: any) => course._id.toString() === courseId.toString()
      );

      if (!courseExists) {
        return next(
          ErrorHandler.unAuthorized(
            "You are not eligible to access this course"
          )
        );
      }

      const course = await CourseModel.findById(courseId);

      const { review, rating }: IAddReviewData = req.body;

      const newReviewData: any = {
        user: req.user,
        comment: review,
        rating,
      };

      course?.reviews.push(newReviewData);

      let totalRatings = 0;
      course?.reviews.forEach((review: any) => {
        totalRatings += review.rating;
      });

      if (course) {
        course.ratings = totalRatings / course.reviews.length;
      }

      await course?.save();

      const notification = {
        title: "New Review Received",
        message: `${req.user?.name} has given a review on ${course?.name}`,
      };

      // create a notification
      await NotificationModel.create({
        user: req.user?._id,
        title: notification.title,
        message: notification.message,
      });

      res.status(200).json({
        success: true,
        message: "Review added successfully",
        course,
      });
    } catch (error: any) {
      return next(ErrorHandler.serverError(error.message));
    }
  }
);

// add reply in review
interface IAddReviewReplyData {
  comment: string;
  courseId: string;
  reviewId: string;
}

export const addReplyToReview = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { comment, courseId, reviewId }: IAddReviewReplyData = req.body;

      const course = await CourseModel.findById(courseId);

      if (!course) {
        return next(ErrorHandler.notFound("Course not found"));
      }

      const review = course?.reviews?.find(
        (review: any) => review._id.toString() === reviewId
      );

      if (!review) {
        return next(ErrorHandler.notFound("Review not found"));
      }

      const replyData: any = {
        user: req.user,
        comment,
      };

      if (!review.commentReplies) {
        review.commentReplies = [];
      }

      course.reviews.push(replyData);

      await course?.save();

      res.status(200).json({
        success: true,
        message: "Reply added successfully",
        course,
      });
    } catch (error: any) {
      return next(ErrorHandler.serverError(error.message));
    }
  }
);

// get all courses -- only admin
export const getAdminAllCourses = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courses = await CourseModel.find().sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        courses,
      });
    } catch (error: any) {
      return next(ErrorHandler.serverError(error.message));
    }
  }
);

// delete course -- only admin
export const deleteCourse = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const course = await CourseModel.findById(id);

      if (!course) {
        return next(ErrorHandler.notFound("Course not found"));
      }

      await course.deleteOne({ id });

      await redisClient.del(id);

      res.status(200).json({
        success: true,

        message: "Course deleted successfully",
      });
    } catch (error: any) {
      return next(ErrorHandler.serverError(error.message));
    }
  }
);

// GENERATE VIDEO URL
export const generateVideoUrl = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { videoId } = req.body;

      const response = await axios.post(
        `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
        { ttl: 300 },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Apisecret ${process.env.VDOCIPHER_API_SECRET}`,
          },
        }
      );

      res.status(200).json(response.data);
    } catch (error: any) {
      return next(ErrorHandler.serverError(error.message));
    }
  }
);
