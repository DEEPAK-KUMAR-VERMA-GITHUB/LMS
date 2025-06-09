import mongoose from "mongoose";

const dbUrl: string = process.env.MONGODB_URI || "";

export const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(dbUrl);
    console.log(`MongoDB connected to ${connection.connection.host}`);
  } catch (error: any) {
    console.log(error.message);

    setTimeout(() => {
      dbConnect();
    }, 5000);
  }
};
