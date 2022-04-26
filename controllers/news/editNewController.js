const { getNewById, editNew } = require("../../db/news");
const { generateError } = require("../../helpers/generateError");
//const { createAndEditNewSchema } = require("../../validators/newValidator");

const editNewController = async (req, res, next) => {
  console.log("hola");
  try {
    const { idNew } = req.params;

    if (isNaN(parseInt(idNew))) {
      throw generateError(
        "El parámetro de la url idNew tiene que ser un número",
        400
      );
    }

    const newToEdit = await getNewById(idNew);
    if (!newToEdit) {
      throw generateError("No existe una noticia con ese ID", 404);
    }

    if (newToEdit.user_id != req.auth.id) {
      throw generateError("No tienes permisos para editar esta entrada", 403);
    }
    // await createAndEditNewSchema.validateAsync(req.body);

    const { title, description, entradilla, topic } = req.body;

    await editNew(idNew, title, description, entradilla, topic);

    res.send({
      status: "ok",
      message: "Noticia actualizado.",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { editNewController };
