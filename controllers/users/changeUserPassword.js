const bcrypt = require("bcrypt");
const { changeUserPassword, getUserByRecoverCode } = require("../../db/users");
const { generateError } = require("../../helpers/generateError");
const { changeUserPasswordSchema } = require("../../validators/userValidator");

const changeUserPasswordController = async (req, res, next) => {
  try {
    await changeUserPasswordSchema.validateAsync(req.body);

    const { recoverCode, newPassword } = req.body;

    const user = await getUserByRecoverCode(recoverCode);

    if (!user) {
      throw generateError(
        "Non existe un usuario con ese codigo de cambio de password",
        404
      );
    }

    const encryptedPassword = await bcrypt.hash(newPassword, 10);

    await changeUserPassword(user.id, encryptedPassword);

    res.send({
      status: "ok",
      message: "Password actualizada",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { changeUserPasswordController };
