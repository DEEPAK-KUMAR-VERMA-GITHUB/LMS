import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
});

export const uploadImage = async (
  image: string,
  folder?: string,
  crop?: boolean
) => {
  const options = {
    folder: folder || "lms",
    width: crop ? 150 : undefined,
    crop: crop ? "scale" : undefined,
  };

  const result = await cloudinary.v2.uploader.upload(image, options);

  return { public_id: result.public_id, url: result.secure_url };
};

export const removeImage = async (publicId: string) => {
  await cloudinary.v2.uploader.destroy(publicId);
};
