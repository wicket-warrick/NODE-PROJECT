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
        `No exsite ningún usuario registrado con ese email o password`,
        401
      );
    }

    if (!userData.active) {
      throw generateError(
        "El usuario no está activado, revise su cuenta de email y finalice el proceso de registro.",
        201
      );
    }

    const userDataPublic = {
      id: userData.id,
      active: userData.active,
      email: userData.email,
      bio: userData.bio,
      name: userData.name,
    };
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
        userDataPublic: userDataPublic,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { loginUserController };
