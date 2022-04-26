const {
  getNewById,
  getNewPhotoById,
  deletePhotoById,
} = require("../../db/news");
const {
  deletePhotoFromSystem,
} = require("../../helpers/deletePhotoFromSystem");
const { generateError } = require("../../helpers/generateError");

const deleteNewPhotoController = async (req, res, next) => {
  try {
    const { idNew, idPhoto } = req.params;

    const New = await getNewById(idNew);

    if (!New) {
      throw generateError("No existe una noticia con ese ID", 404);
    }

    if (New.user_id != req.auth.id) {
      throw generateError("No tienes permisos para editar esta noticia", 403);
    }

    const photo = await getNewPhotoById(idPhoto);

    if (!photo) {
      throw generateError("No existe una imagen con ese ID", 404);
    }

    // borrar imagen de la base de datos y del sistema
    await deletePhotoById(idPhoto);
    await deletePhotoFromSystem(photo.url);

    res.send({
      status: "ok",
      message: "Imagen borrada",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteNewPhotoController };
