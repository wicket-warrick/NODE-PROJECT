const path = require("path");
const sharp = require("sharp");
const uuid = require("uuid");
const fs = require("fs").promises;

const photoUploadPath = path.join(__dirname, "../", process.env.UPLOADS_DIR);

const processAndSavePhoto = async (photoData) => {
  await fs.mkdir(photoUploadPath, { recursive: true });
  const photo = sharp(photoData);

  const photoInfo = await photo.metadata();
  if (photoInfo.width > 1000) {
    photo.resize(500);
  }
  const photoFileName = `${uuid.v4()}.jpg`;
  await photo.toFile(path.join(photoUploadPath, photoFileName));
  return photoFileName;
};

module.exports = { processAndSavePhoto, photoUploadPath };
