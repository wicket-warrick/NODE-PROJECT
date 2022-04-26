const { deleteNew, getNewById } = require("../../db/news");
const { generateError } = require("../../helpers/generateError");

const deleteNewController = async (req, res, next) => {
  try {
    const { idNew } = req.params;

    if (isNaN(parseInt(idNew))) {
      throw generateError(
        "El parámetro de la url idNew tiene que ser un número",
        400
      );
    }
    const newToDelete = await getNewById(idNew);
    if (!newToDelete) {
      throw generateError("No existe una noticia con ese ID", 404);
    }

    if (newToDelete.user_id != req.auth.id) {
      throw generateError("No tienes permisos para editar esta entrada", 403);
    }

    await deleteNew(idNew);

    res.send({
      status: "ok",
      message: "Noticia eliminada.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteNewController };
