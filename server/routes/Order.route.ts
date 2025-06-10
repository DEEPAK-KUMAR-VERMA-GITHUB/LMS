import express from "express";
import { createOrder } from "../controllers/order.controller";
import { isAuthenticated } from "../middleware/auth";

const orderRoutes = express.Router();

orderRoutes.post("/create-order", isAuthenticated, createOrder);

export default orderRoutes;
