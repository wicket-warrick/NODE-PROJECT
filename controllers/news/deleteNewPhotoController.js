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
      throw generateError(`No existe ninguna noticia con id:${idNew}`, 404);
    }

    if (New.user_id != req.auth.id) {
      throw generateError(
        "No tiene permisos para editar la noticia.Solo es posible editar noticias por el autor de las mismas",
        403
      );
    }

    const photo = await getNewPhotoById(idPhoto);

    if (!photo) {
      throw generateError(`No existe ninguna imagen con id:${idPhoto}`, 404);
    }

    await deletePhotoById(idPhoto);

    await deletePhotoFromSystem(photo.url);

    res.send({
      status: "ok",
      message: "Imagen borrada correctamente",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteNewPhotoController };
