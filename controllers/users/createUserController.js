const bcrypt = require("bcrypt");
const { createUser } = require("../../db/users");
const { generateError } = require("../../helpers/generateError");
const { sendEmail } = require("../../helpers/sendEmailNodeMailer");

const { newUserSchema } = require("../../validators/userValidator");

const createUserController = async (req, res, next) => {
  try {
    await newUserSchema.validateAsync(req.body);
    const { name, email, password, bio } = req.body;

    const encryptedPassword = await bcrypt.hash(password, 10);

    const { userId, registrationCode } = await createUser(
      name,
      email,
      encryptedPassword,
      bio
    );

  /**
   * *LOCAL DEPLOYMENT
   */
    // const validationUrl = `${process.env.API_HOST}:${process.env.API_PORT_FRONTEND}/user/validate/${registrationCode}`;

  /**
   * *WEB DEPLOYMENT
   */
    const validationUrl = `${process.env.API_HOST}/user/validate/${registrationCode}`;
    try {
     
      await sendEmail({
        email: email,
        subject: "Validación cuenta de usuario.",
        content:
          "Para finalizar el proceso de registra, por favor, accede al siguiente link:",
        link: validationUrl,
      });
    } catch (error) {
      throw generateError(
        "Error de envio de email para la activacion de la cuenta"
      );
    }

    res.statusCode = 201;
    res.setHeader("Content-Location", `/users/${userId}`);
    res.send({
      status: "ok",
      message:
        "Usuario registrado correctamente.Por favor, revisa la bandeja de entrada de la cuenta de correo, para validar su perfil",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createUserController };
