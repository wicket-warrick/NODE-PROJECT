const path = require("path");
const sharp = require("sharp");
const uuid = require("uuid");
const fs = require("fs").promises;

const avatarUploadPath = path.join(__dirname, "../", process.env.AVATAR_DIR);

const processAndSaveAvatar = async (avatarData) => {
  await fs.mkdir(avatarUploadPath, { recursive: true });
  const avatar = sharp(avatarData);

  const avatarInfo = await avatar.metadata();
  if (avatarInfo.width > 180) {
    avatar.resize(180);
  }
  const avatarFileName = `${uuid.v4()}.jpg`;
  await avatar.toFile(path.join(avatarUploadPath, avatarFileName));
  return avatarFileName;
};

module.exports = { processAndSaveAvatar, avatarUploadPath };
