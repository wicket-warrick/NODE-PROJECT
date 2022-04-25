const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateError } = require("../../helpers/generateError");
const { loginUserSchema } = require("../../validators/userValidator");
const { getUserByEmail } = require("../../db/users");

const loginUserController = async (req, res, next) => {
  try {
    await loginUserSchema.validateAsync(req.body);
    const { email, password } = req.body;
    const userData = await getUserByEmail(email);

    const isLoginValid =
      userData && (await bcrypt.compare(password, userData.password));

    if (!isLoginValid) {
      throw generateError(
        `Non exsite ningún usuario rexistrado con ese email o contrasinal`,
        401
      );
    }

    if (!userData.active) {
      throw generateError(
        "O usuario non está activado, revisa o teu email",
        201
      );
    }

    const tokenPayload = {
      id: userData.id,
    };
    const token = jwt.sign(tokenPayload, process.env.API_SECRET, {
      expiresIn: "1d",
    });
    res.send({
      status: "ok",
      data: {
        token: token,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { loginUserController };
