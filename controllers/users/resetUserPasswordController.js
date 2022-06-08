const bcrypt = require("bcrypt");
const { getUserByRecoverCode, changeUserPassword } = require("../../db/users");
const { generateError } = require("../../helpers/generateError");
const { resetUserPasswordSchema } = require("../../validators/userValidator");

const resetUserPasswordController = async (req, res, next) => {
  try {
    await resetUserPasswordSchema.validateAsync(req.body);

    const { recoverCode, newPassword } = req.body;

    const user = await getUserByRecoverCode(recoverCode);

    if (!user) {
      throw generateError(
        "No hay ningún usuario con ese código de recuperación",
        404
      );
    }

    const encryptedPassword = await bcrypt.hash(newPassword, 10);

    await changeUserPassword(user.id, encryptedPassword);

    res.send({
      status: "ok",
      message: "Password actualizado correctamente",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resetUserPasswordController;
