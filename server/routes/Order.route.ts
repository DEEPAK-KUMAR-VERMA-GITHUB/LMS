import express from "express";
import {
  createOrder,
  getAllOrders,
  newPayment,
  sendStripePublishableKey,
} from "../controllers/order.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { updateAccessToken } from "../controllers/user.controller";

const orderRoutes = express.Router();

orderRoutes.post("/create-order", isAuthenticated, createOrder);
orderRoutes.get(
  "/get-all-orders",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  getAllOrders
);

orderRoutes.get("/payment/stripepublishablekey", sendStripePublishableKey);
orderRoutes.post("/payment", updateAccessToken, isAuthenticated, newPayment);

export default orderRoutes;
