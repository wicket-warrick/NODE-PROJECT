const { getNewById, editNew } = require("../../db/news");
const { generateError } = require("../../helpers/generateError");
//const { createAndEditNewSchema } = require("../../validators/newValidator");

const editNewController = async (req, res, next) => {
  try {
    const { idNew } = req.params;

    if (isNaN(parseInt(idNew))) {
      throw generateError("O parámetro ID debe ser un número", 400);
    }

    const newToEdit = await getNewById(idNew);
    if (!newToEdit) {
      throw generateError("Non existe unha noticia con esa ID", 404);
    }

    if (newToEdit.user_id != req.auth.id) {
      throw generateError("Non tes os permisos para editar esta noticia", 403);
    }

    const { title, description, entradilla, topic } = req.body;

    await editNew(idNew, title, description, entradilla, topic);

    res.send({
      status: "ok",
      message: "Noticia actualizada.",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { editNewController };
