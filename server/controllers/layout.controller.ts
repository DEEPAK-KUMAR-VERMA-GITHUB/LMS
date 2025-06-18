import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import Layout from "../models/layout.model";
import { removeImage, uploadImage } from "../utils/cloudinary";
import redisClient from "../db/redis";

// create layout
export const createLayout = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;

      // check if layout already exists
      const layoutExists = await Layout.findOne({ type });
      if (layoutExists) {
        return next(ErrorHandler.conflict(`${type} layout already exists`));
      }

      // create new layout
      if (type === "Banner") {
        const { image, title, subTitle } = req.body;

        const { public_id, url } = await uploadImage(image, "layout");

        const banner = {
          image: {
            public_id,
            url,
          },
          title,
          subTitle,
        };

        await new Layout({ type: "Banner", banner }).save();
      }

      if (type === "FAQ") {
        const { faq } = req.body;
        await new Layout({ type: "FAQ", faq }).save();
      }

      if (type === "Categories") {
        const { categories } = req.body;
        await new Layout({ type: "Categories", categories }).save();
      }

      // clear redis cache
      await redisClient.del(`layout-${type}`);

      res.status(201).json({
        success: true,
        message: "Layout created successfully",
      });
    } catch (error: any) {
      return next(ErrorHandler.serverError(error.message));
    }
  }
);

// edit layout -- only admin
export const editLayout = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;

      // check if layout already exists
      const layoutExists = await Layout.findOne({ type });
      if (!layoutExists) {
        return next(ErrorHandler.notFound(`${type} layout does not exist`));
      }

      // update layout
      if (type === "Banner") {
        const { image, title, subTitle } = req.body;

        // if already a banner image then remove it first
        if (!image.startsWith("https") && layoutExists.banner.image.public_id) {
          await removeImage(layoutExists.banner.image.public_id as string);
        }

        let banner;
        if (!image.startsWith("https")) {
          const { public_id, url } = await uploadImage(image, "layout");
          banner = {
            image: {
              public_id,
              url,
            },
            title,
            subTitle,
          };
        } else {
          banner = {
            image: layoutExists.banner.image,
            title,
            subTitle,
          };
        }

        await Layout.findByIdAndUpdate(layoutExists._id, {
          banner,
        });
      }

      if (type === "FAQ") {
        const { faq } = req.body;
        await Layout.findByIdAndUpdate(layoutExists._id, {
          faq,
        });
      }

      if (type === "Categories") {
        const { categories } = req.body;
        await Layout.findByIdAndUpdate(layoutExists._id, {
          categories,
        });
      }

      // clear redis cache
      await redisClient.del(`layout-${type}`);

      res.status(200).json({
        success: true,
        message: "Layout updated successfully",
      });
    } catch (error: any) {
      return next(ErrorHandler.serverError(error.message));
    }
  }
);

// get layout by type
export const getLayoutByType = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.params;

      // if cache available in redis
      const layoutCache = await redisClient.get(`layout-${type}`);
      if (layoutCache) {
        return res.status(200).json({
          success: true,
          layout: JSON.parse(layoutCache),
        });
      }

      const layout = await Layout.findOne({ type });

      if (!layout) {
        return next(ErrorHandler.notFound(`${type} layout does not exist`));
      }

      // store in redis
      await redisClient.set(`layout-${type}`, JSON.stringify(layout));

      res.status(200).json({
        success: true,
        layout,
      });
    } catch (error: any) {
      return next(ErrorHandler.serverError(error.message));
    }
  }
);
