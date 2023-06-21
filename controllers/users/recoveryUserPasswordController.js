const { getUserByEmail, updateUserRecoverCode } = require("../../db/users");

const { generateError } = require("../../helpers/generateError");
const { sendEmailRecoveryPassword } = require("../../helpers/sendEmailNodeMailer");
const {
  recoveryUserPasswordSchema,
} = require("../../validators/userValidator");

const recoveryUserPasswordController = async (req, res, next) => {
  try {
    await recoveryUserPasswordSchema.validateAsync(req.body);

    const { email } = req.body;

    const user = await getUserByEmail(email);

    if (!user) {
      throw generateError(`No hay ningún usuario con email ${email}`, 404);
    }

    const recoverCode = await updateUserRecoverCode(email);

    try {
      await sendEmailRecoveryPassword({
        email: email,
        subject: "Código de reseteo del password",
        content: `Para poder recuperar el password, debes utilizar el siguinte código:
          ${recoverCode}`,
      });
    } catch (error) {
      throw generateError("Error de envío de email", 500);
    }

    res.send({
      status: "ok",
      message:
        "Se ha enviado un email , a la cuenta asociada con el usuario. Por favor revise su bandeja de entrada, para finalizar el proceso. ",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = recoveryUserPasswordController;
