const bcrypt = require("bcrypt");
const { createUser } = require("../../db/users");
const { generateError } = require("../../helpers/generateError");
const { sendEmail } = require("../../helpers/sendEmail");
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

    const validationUrl = `${process.env.API_HOST}:${process.env.API_PORT}/users/validate/${registrationCode}`;
    try {
      await sendEmail(
        email,
        "Valida a tua conta de usuario",
        `Para validar clic aqui ${validationUrl}`
      );
    } catch (error) {
      throw generateError("erro de envio de email para activacion");
    }

    res.statusCode = 201;
    res.setHeader("Content-Location", `/users/${userId}`);
    res.send({
      status: "ok",
      message: "Usuario rexistrado correctamente",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createUserController };
