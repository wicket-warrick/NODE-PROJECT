const { getUserById } = require("../../db/users");
const { generateError } = require("../../helpers/generateError");

const getUserByIdController = async (req, res, next) => {
  try {
    const { idUser } = req.params;

    if (isNaN(parseInt(idUser))) {
      throw generateError("O parámetro ID debe ser un número", 400);
    }

    const user = await getUserById(idUser);

    if (!user) {
      throw generateError(`No hay usuario con ese ID`, 400);
    }
    res.send({
      status: "ok",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getUserByIdController;
