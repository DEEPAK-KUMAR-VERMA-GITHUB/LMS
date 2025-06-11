import mongoose, { Schema, Model, Document } from "mongoose";

export interface IFAQItem extends Document {
  question: String;
  answer: String;
}

export interface ICategory extends Document {
  title: String;
}

export interface IBannerImage extends Document {
  public_id: String;
  url: String;
}

export interface ILayout extends Document {
  type: String;
  faq: IFAQItem[];
  categories: ICategory[];
  banner: {
    image: IBannerImage;
    title: String;
    subTitle: String;
  };
}

const faqItemSchema = new Schema<IFAQItem>({
  question: String,
  answer: String,
});

const categorySchema = new Schema<ICategory>({
  title: String,
});

const bannerImageSchema = new Schema<IBannerImage>({
  public_id: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const layoutSchema = new Schema<ILayout>({
  type: {
    type: String,
  },
  faq: [faqItemSchema],
  categories: [categorySchema],
  banner: {
    image: bannerImageSchema,
    title: String,
    subTitle: String,
  },
});

const Layout: Model<ILayout> = mongoose.model("Layout", layoutSchema);
export default Layout;
