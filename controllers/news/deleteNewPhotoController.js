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
      throw generateError("Non existe unha noticia con ese ID", 404);
    }

    if (New.user_id != req.auth.id) {
      throw generateError("Non tes os permisos para editar esta noticia", 403);
    }

    const photo = await getNewPhotoById(idPhoto);

    if (!photo) {
      throw generateError("Non existe unha imaxe con esa ID", 404);
    }

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
