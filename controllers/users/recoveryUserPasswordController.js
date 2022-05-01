const { getUserByEmail, updateUserRecoverCode } = require("../../db/users");

const { generateError } = require("../../helpers/generateError");
const { sendEmail } = require("../../helpers/sendEmail");
const {
  recoveryUserPasswordSchema,
} = require("../../validators/userValidator");

const recoveryUserPasswordController = async (req, res, next) => {
  try {
    await recoveryUserPasswordSchema.validateAsync(req.body);

    const { email } = req.body;

    const user = await getUserByEmail(email);

    if (!user) {
      throw generateError(
        `Non hai ningún usuario con email ${email} na base de datos`,
        404
      );
    }

    const recoverCode = await updateUserRecoverCode(email);

    try {
      await sendEmail(
        email,
        "Código de reseteo do teu password",
        `
          Para poder recuperar o contrasinal, debes utilizar o seguinte código:
          ${recoverCode}
        `
      );
    } catch (error) {
      throw generateError("Erro de envío de email", 500);
    }

    res.send({
      status: "ok",
      message: "Enviouse un email á conta de coarreo asociada có usuario ",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = recoveryUserPasswordController;
