const {
  getUserById,
  getUserAvatarById,
  deleteAvatarById,
} = require("../../db/users");
const {
  deleteAvatarFromSystem,
} = require("../../helpers/deleteAvatarFromSystem");

const { generateError } = require("../../helpers/generateError");

const deleteUseAvatarController = async (req, res, next) => {
  try {
    const { idUser, idAvatar } = req.params;

    const user = await getUserById(idUser);

    if (!user) {
      throw generateError(`No existe ningún usuario con id:${idUser}`, 404);
    }

    if (user.id != req.auth.id) {
      throw generateError("No tiene permisos para editar este usuario.", 403);
    }

    const avatar = await getUserAvatarById(idAvatar);

    if (!avatar) {
      throw generateError(`No existe ningún  Avatar con id:${idAvatar}`, 404);
    }

    await deleteAvatarById(idAvatar);

    await deleteAvatarFromSystem(avatar.url);

    res.send({
      status: "ok",
      message: "Avatar borrado correctamente.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteUseAvatarController };
