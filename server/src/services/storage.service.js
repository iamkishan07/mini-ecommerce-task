import ImageKit, { toFile } from "@imagekit/nodejs";
import config from "../config/config.js";

const client = new ImageKit({
  privateKey: config.IMAGEKIT_PRIVATE_KEY,
});

export const uploadFile = async ({ buffer, fileName }) => {
  try {
    console.log("📤 Starting ImageKit upload...");
    console.log("File name:", fileName);
    console.log("Buffer size:", buffer?.length);

    if (!buffer) {
      throw new Error("File buffer is missing");
    }

    if (!fileName) {
      throw new Error("File name is missing");
    }

    const file = await toFile(buffer, fileName);

    console.log("✅ File converted successfully");
    console.log("⬆️ Sending file to ImageKit...");

    const response = await client.files.upload({
      file,
      fileName,
      folder: "snitch",
    });

    console.log("✅ ImageKit upload successful");
    console.log("Image URL:", response.url);

    return response;
  } catch (error) {
    console.error("❌ ImageKit Upload Error:", error);

    throw error;
  }
};
