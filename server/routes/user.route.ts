import express from "express";
import {
  activateUser,
  deleteUser,
  getAllUsers,
  getUserInfo,
  loginUser,
  logoutUser,
  registerUser,
  socialAuth,
  updateAccessToken,
  updatePassword,
  updateProfilePicture,
  updateUserInfo,
  updateUserRole,
} from "../controllers/user.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

const router = express.Router();

router.post("/registration", registerUser);
router.post("/activate-user", activateUser);
router.post("/login", loginUser);
router.post("/logout", updateAccessToken, isAuthenticated, logoutUser);
router.get("/refresh-token", updateAccessToken);
router.get("/me", updateAccessToken, isAuthenticated, getUserInfo);
router.post("/social-auth", socialAuth);
router.patch(
  "/update-user-info",
  updateAccessToken,
  isAuthenticated,
  updateUserInfo
);
router.put(
  "/update-user-password",
  updateAccessToken,
  isAuthenticated,
  updatePassword
);
router.patch(
  "/update-user-avatar",
  updateAccessToken,
  isAuthenticated,
  updateProfilePicture
);
router.get(
  "/get-all-users",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  getAllUsers
);
router.patch(
  "/update-user-role",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  updateUserRole
);
router.delete(
  "/delete-user/:id",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  deleteUser
);

export default router;
