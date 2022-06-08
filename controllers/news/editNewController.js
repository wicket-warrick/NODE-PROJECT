const { getNewById, editNew } = require("../../db/news");
const { generateError } = require("../../helpers/generateError");
//const { createAndEditNewSchema } = require("../../validators/newValidator");

const editNewController = async (req, res, next) => {
  try {
    const { idNew } = req.params;

    if (isNaN(parseInt(idNew))) {
      throw generateError("El parámetro 'id' debe ser un número.", 400);
    }

    const newToEdit = await getNewById(idNew);
    if (!newToEdit) {
      throw generateError(`No existe ninguna noticia con id:${idNew}`, 404);
    }

    if (newToEdit.user_id != req.auth.id) {
      throw generateError(
        "No tiene permisos para editar la noticia.Solo es posible editar noticias por el autor de las mismas",
        403
      );
    }

    const { title, description, entradilla, topic } = req.body;

    await editNew(idNew, title, description, entradilla, topic);

    res.send({
      status: "ok",
      message: "Noticia actualizada correctamente.",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { editNewController };
