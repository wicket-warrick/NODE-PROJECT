const fs = require("fs").promises;
const path = require("path");
const { avatarUploadPath } = require("./processUserAvatar");
const deleteAvatarFromSystem = async (avatarName) => {
  await fs.unlink(path.join(avatarUploadPath, avatarName));
};

module.exports = { deleteAvatarFromSystem };
