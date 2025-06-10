import express from "express";
import {
  getNotifications,
  updateNotification,
} from "../controllers/notification.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

const notificationRoutes = express.Router();

notificationRoutes.get(
  "/get-all-notifications",
  isAuthenticated,
  authorizeRoles("admin"),
  getNotifications
);

notificationRoutes.put(
  "/update-notification/:notificationId",
  isAuthenticated,
  authorizeRoles("admin"),
  updateNotification
);

export default notificationRoutes;
