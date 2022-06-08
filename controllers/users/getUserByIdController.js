const { getUserById } = require("../../db/users");
const { generateError } = require("../../helpers/generateError");

const getUserByIdController = async (req, res, next) => {
  try {
    const { idUser } = req.params;

    if (isNaN(parseInt(idUser))) {
      throw generateError("El parámetro 'id' debe ser un número.", 400);
    }

    const user = await getUserById(idUser);

    if (!user) {
      throw generateError(`No existe ningún usuario con id:${idUser}`, 400);
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
