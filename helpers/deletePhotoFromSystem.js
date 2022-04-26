const { photoUploadPath } = require("./processNewPhoto");
const fs = require("fs").promises;
const path = require("path");
const deletePhotoFromSystem = async (photoName) => {
  await fs.unlink(path.join(photoUploadPath, photoName));
};

module.exports = { deletePhotoFromSystem };
