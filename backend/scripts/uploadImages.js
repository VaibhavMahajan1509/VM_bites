import fs from "fs";
import path from "path";
import cloudinary from "../src/config/cloudinary.js";

const folderPath = path.resolve("public/images");

const uploadImages = async () => {
  console.log("Script started...");

  const files = fs.readdirSync(folderPath);
  console.log("Files found:", files);

  for (const file of files) {
    const filePath = path.join(folderPath, file);

    console.log("Uploading:", filePath);

    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: "food-items",
      });

      console.log("Uploaded:", file);
      console.log("URL:", result.secure_url);

    } catch (err) {
      console.log("Upload failed for:", file);
      console.log(err.message);
    }
  }
};

uploadImages();