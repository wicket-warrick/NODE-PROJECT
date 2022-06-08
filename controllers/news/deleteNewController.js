const { deleteNew, getNewById } = require("../../db/news");
const { generateError } = require("../../helpers/generateError");

const deleteNewController = async (req, res, next) => {
  try {
    const { idNew } = req.params;

    if (isNaN(parseInt(idNew))) {
      throw generateError("El parámetro 'id' debe ser un número.", 400);
    }
    const newToDelete = await getNewById(idNew);
    if (!newToDelete) {
      throw generateError(`No existe ninguna noticia con id:${idNew}`, 404);
    }

    if (newToDelete.user_id != req.auth.id) {
      throw generateError(
        "No tiene permisos para borrar la noticia.Solo es posible borrar noticias por el autor de las mismas",
        403
      );
    }

    await deleteNew(idNew);

    res.send({
      status: "ok",
      message: "Noticia eliminada con exito.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteNewController };
