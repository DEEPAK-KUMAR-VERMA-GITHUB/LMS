import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import errorMiddleware from "./middleware/error";
import userRoutes from "./routes/user.route";
import courseRoutes from "./routes/course.route";
import orderRoutes from "./routes/Order.route";
import notificationRoutes from "./routes/notification.route";
import analyticsRoutes from "./routes/analytics.route";
import layoutRoutes from "./routes/layout.route";
import { rateLimit } from "express-rate-limit";

dotenv.config();

export const app = express();

// body parser
app.use(express.json({ limit: "50mb" }));

// cookie parser
app.use(cookieParser());

// Configure CORS with proper security settings
const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      process.env.FRONTEND_URL || "http://localhost:3000",
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  exposedHeaders: ["Set-Cookie"],
  maxAge: 86400 // 24 hours
};

app.use(cors(corsOptions));

// implement rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    status: false,
    message: "Too many requests from this IP, please try again after 15 minutes",
  },
  // Skip rate limiting for health check
  skip: (req) => req.path === '/health',
});

// stricter rate limiter for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 auth requests per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: false,
    message: "Too many authentication attempts, please try again after 15 minutes",
  },
});

// use rate limiter
app.use(limiter);

// health check route
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  });
});

// API routes with specific rate limits
app.use("/api/v1/users", authLimiter, userRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/analytics", analyticsRoutes);
app.use("/api/v1/layout", layoutRoutes);

// unknown routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Route ${req.originalUrl} not found`) as any;
  error.statusCode = 404;
  next(error);
});

// error handling middleware
app.use(errorMiddleware);
