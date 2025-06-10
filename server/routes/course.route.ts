import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import {
  addAnswer,
  addQuestion,
  editCourse,
  getAllCourses,
  getCourseByUser,
  getSingleCourse,
  uploadCourse,
} from "../controllers/course.controller";

const courseRouter = express.Router();

courseRouter.post(
  "/create-course",
  isAuthenticated,
  authorizeRoles("admin"),
  uploadCourse
);

courseRouter.put(
  "/edit-course/:courseId",
  isAuthenticated,
  authorizeRoles("admin"),
  editCourse
);

courseRouter.get("/get-course/:courseId", getSingleCourse);

courseRouter.get("/get-courses", getAllCourses);

courseRouter.get(
  "/get-course-content/:courseId",
  isAuthenticated,
  getCourseByUser
);

courseRouter.put("/add-question", isAuthenticated, addQuestion);
courseRouter.put("/add-answer", isAuthenticated, addAnswer);



export default courseRouter;
