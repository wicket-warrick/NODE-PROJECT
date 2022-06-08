const { getUserById, deleteUser } = require("../../db/users");
const { generateError } = require("../../helpers/generateError");

const deleteUserController = async (req, res, next) => {
  try {
    const { idUser } = req.params;

    if (isNaN(parseInt(idUser))) {
      throw generateError("El parámetro 'id' debe ser un número.", 400);
    }
    const userToDelete = await getUserById(idUser);
    if (!userToDelete) {
      throw generateError(`No existe ningún usuario con id:${idUser}`, 404);
    }

    if (userToDelete.id != req.auth.id) {
      throw generateError("No tiene permisos para editar este usuario.", 403);
    }

    await deleteUser(idUser);

    res.send({
      status: "ok",
      message: "Usuario eliminado correctamente.",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { deleteUserController };
