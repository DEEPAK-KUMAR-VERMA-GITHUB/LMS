import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import Layout from "../models/layout.model";
import { removeImage, uploadImage } from "../utils/cloudinary";

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
        if (layoutExists.banner.image.public_id) {
          await removeImage(layoutExists.banner.image.public_id as string);
        }

        const { public_id, url } = await uploadImage(image, "layout");

        const banner = {
          image: {
            public_id,
            url,
          },
          title,
          subTitle,
        };

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

      const layout = await Layout.findOne({ type });

      if (!layout) {
        return next(ErrorHandler.notFound(`${type} layout does not exist`));
      }

      res.status(200).json({
        success: true,
        layout,
      });
    } catch (error: any) {
      return next(ErrorHandler.serverError(error.message));
    }
  }
);
