const { getUserById, deleteUser } = require("../../db/users");
const { generateError } = require("../../helpers/generateError");

const deleteUserController = async (req, res, next) => {
  try {
    const { idUser } = req.params;

    if (isNaN(parseInt(idUser))) {
      throw generateError("O parámetro ID do usuario debe ser un número", 400);
    }
    const userToDelete = await getUserById(idUser);
    if (!userToDelete) {
      throw generateError("Non existe unha noticia con esa ID", 404);
    }

    if (userToDelete.id != req.auth.id) {
      throw generateError("Non tes os permisos para borrar este usuario", 403);
    }

    await deleteUser(idUser);

    res.send({
      status: "ok",
      message: "Usuario eliminada.",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { deleteUserController };
