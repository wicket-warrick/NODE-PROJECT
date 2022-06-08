const bcrypt = require("bcrypt");
const { changeUserPassword, getUserById } = require("../../db/users");
const { generateError } = require("../../helpers/generateError");
const { changeUserPasswordSchema } = require("../../validators/userValidator");

const changeUserPasswordController = async (req, res, next) => {
  try {
    const { idUser } = req.params;
    await changeUserPasswordSchema.validateAsync(req.body);

    const { currentPassword, newPassword } = req.body;
    const user = await getUserById(idUser);

    if (!user) {
      throw generateError(`No existe ningun usuario con id:${idUser}`, 404);
    }
    if (user.id != req.auth.id) {
      throw generateError("No tiene permisos para editar este usuario.", 403);
    }
    const isPasswordCorrect =
      user && (await bcrypt.compare(currentPassword, user.password));

    if (!isPasswordCorrect) {
      throw generateError("Password incorrecto. ", 404);
    }

    const encryptedPassword = await bcrypt.hash(newPassword, 10);

    await changeUserPassword(user.id, encryptedPassword);

    res.send({
      status: "ok",
      message: "Password actualizado",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { changeUserPasswordController };
