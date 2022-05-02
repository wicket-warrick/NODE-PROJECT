const { getUserById, editUser } = require("../../db/users");
const { generateError } = require("../../helpers/generateError");
const editUserController = async (req, res, next) => {
  try {
    const { idUser } = req.params;

    if (isNaN(parseInt(idUser))) {
      throw generateError("O parámetro ID debe ser un número", 400);
    }

    const userToEdit = await getUserById(idUser);
    if (!userToEdit) {
      throw generateError("Non existe un usuario con esa ID", 404);
    }

    if (userToEdit.id != req.auth.id) {
      throw generateError("Non tes os permisos para editar este usuario", 403);
    }

    const { name, bio, email } = req.body;

    await editUser(idUser, name, bio, email);

    res.send({
      status: "ok",
      message: "Usuario modificado.",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { editUserController };
