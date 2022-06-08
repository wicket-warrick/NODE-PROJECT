const { createUserAvatar, getUserById } = require("../../db/users.js");
const { generateError } = require("../../helpers/generateError.js");

const { processAndSaveAvatar } = require("../../helpers/processUserAvatar.js");

const uploadAvatarUserController = async (req, res, next) => {
  try {
    const { idUser } = req.params;
    const user = await getUserById(idUser);
    if (!user) {
      throw generateError(`No existe ningún usuario con id:${idUser}`, 404);
    }
    if (user.id != req.auth.id) {
      throw generateError("No tiene permisos para editar este usuario.", 403);
    }
    if (req.files && req.files.photo) {
      try {
        const processedAvatar = await processAndSaveAvatar(
          req.files.photo.data
        );
        await createUserAvatar(idUser, processedAvatar);
      } catch (err) {
        throw generateError(
          "Problema subiendo el arhivo.Inténtelo de nuevo más tarde.",
          500
        );
      }
    } else {
      throw generateError("No hai ningún avatar para subir", 400);
    }

    res.send({
      status: "ok",
      data: {
        message: "Avatar subido correctamente",
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = uploadAvatarUserController;
