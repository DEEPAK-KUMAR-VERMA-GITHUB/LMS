import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import errorMiddleware from "./middleware/error";
import userRoutes from "./routes/user.route";

dotenv.config();

export const app = express();

// body parser
app.use(express.json({ limit: "50mb" }));

// cookie parser
app.use(cookieParser());

// cors
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// health check route
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  });
});

// API routes
app.use("/api/v1/users", userRoutes);

// unknown routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Route ${req.originalUrl} not found`) as any;
  error.statusCode = 404;
  next(error);
});

// error handling middleware
app.use(errorMiddleware);
