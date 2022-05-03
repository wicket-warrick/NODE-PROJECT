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
      throw generateError("Non existe unha usuario con ese ID", 404);
    }

    if (user.id != req.auth.id) {
      throw generateError("Non tes os permisos para editar este usuario", 403);
    }

    const avatar = await getUserAvatarById(idAvatar);

    if (!avatar) {
      throw generateError("Non existe un avatar con esa ID", 404);
    }

    await deleteAvatarById(idAvatar);

    await deleteAvatarFromSystem(avatar.url);

    res.send({
      status: "ok",
      message: "Avatar borrado",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteUseAvatarController };
