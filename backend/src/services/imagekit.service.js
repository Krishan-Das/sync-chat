import imagekitClient from "../config/imageKit.js";

export const uploadImage = async (buffer,originalname, username, folder) => {
  const extension = originalname.split(".").pop();
  const fileName = `profile-${username}-${Date.now()}.${extension}`;
  try {
    const response = await imagekitClient.files.upload({
      file: buffer,
      fileName,
      folder,
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteImage = async (fileId) => {
  if (!fileId) return;

  try {
    await imagekitClient.files.delete(fileId);
  } catch (error) {
    throw error;
  }
};