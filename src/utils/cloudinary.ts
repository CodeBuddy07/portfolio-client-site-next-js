/* eslint-disable @typescript-eslint/no-explicit-any */
import { v2 as cloudinary } from "cloudinary";

// Configure once
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
});

// Upload from a buffer (for file streams or base64)

export const uploadImageToCloudinary = async (
  file: File | Blob,
  folder = 'portfolio'
): Promise<{ url: string; public_id: string }> => {
  const buffer = await file.arrayBuffer();
  const base64String = Buffer.from(buffer).toString('base64');
  const dataURI = `data:${file.type};base64,${base64String}`;

  const result = await cloudinary.uploader.upload(dataURI, {
    folder,
  });

  return {
    url: result.secure_url,
    public_id: result.public_id,
  };
};


// Delete by public_id
export const deleteImageFromCloudinary = async (publicId: string) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error : any) {
    console.log(error);
    throw new Error("Failed to delete image from Cloudinary");
  }
};
