const { createUserAvatar, getUserById } = require("../../db/users.js");
const { generateError } = require("../../helpers/generateError.js");

const { processAndSaveAvatar } = require("../../helpers/processUserAvatar.js");

const uploadAvatarUserController = async (req, res, next) => {
  try {
    const { idUser } = req.params;
    const user = await getUserById(idUser);
    if (!user) {
      throw generateError("Non exsite ningún usuario con esa id", 404);
    }
    if (user.id != req.auth.id) {
      throw generateError("No tienes permisos para editar este usuario", 403);
    }
    if (req.files && req.files.photo) {
      try {
        const processedAvatar = await processAndSaveAvatar(
          req.files.photo.data
        );
        await createUserAvatar(idUser, processedAvatar);
      } catch (err) {
        throw generateError(
          "Houbo un problema gardando o avatar, inténtalo de novo",
          500
        );
      }
    } else {
      throw generateError("Non hai ningún avatar para subir", 400);
    }

    res.send({
      status: "ok",
      message: "O avatar subiuse correctamente",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = uploadAvatarUserController;
