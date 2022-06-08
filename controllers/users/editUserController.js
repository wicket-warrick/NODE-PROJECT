const { getUserById, editUser } = require("../../db/users");
const { generateError } = require("../../helpers/generateError");
const editUserController = async (req, res, next) => {
  try {
    const { idUser } = req.params;

    if (isNaN(parseInt(idUser))) {
      throw generateError("El parámetro 'id' debe ser un número.", 400);
    }

    const userToEdit = await getUserById(idUser);
    if (!userToEdit) {
      throw generateError(`No existe ningún usuario con id:${idUser}`, 404);
    }

    if (userToEdit.id != req.auth.id) {
      throw generateError("No tiene permisos para editar este usuario.", 403);
    }

    const { name, bio, email } = req.body;

    await editUser(idUser, name, bio, email);

    res.send({
      status: "ok",
      message: "Usuario modificado correctamente.",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { editUserController };
