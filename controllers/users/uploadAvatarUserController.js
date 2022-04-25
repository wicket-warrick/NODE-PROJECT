const { getUserbyId, createUserAvatar } = require("../../db/users.js");
const { generateError } = require("../../helpers/generateError.js");

const { processAndSaveAvatar } = require("../../helpers/processUserAvatar.js");

const uploadAvatarUserController = async (req, res, next) => {
  try {
    const { idUser } = req.params;
    const user = await getUserbyId(idUser);
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
          "Ha habido un problema guardando la avatar, inténtalo de nuevo",
          500
        );
      }
    } else {
      throw generateError("No se ha subido una avatar con el valor photo", 400);
    }

    res.send({
      status: "ok",
      message: "La avatar se ha subido correctamente",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = uploadAvatarUserController;
