const { createNewPhoto, getNewById } = require("../../db/news.js");
const { generateError } = require("../../helpers/generateError.js");
const { processAndSavePhoto } = require("../../helpers/processNewPhoto.js");

const uploadPhotoNewController = async (req, res, next) => {
  try {
    const { idNew } = req.params;
    const New = await getNewById(idNew);
    if (!New) {
      throw generateError("Non exsite ninguna noticia con esa id", 404);
    }
    if (New.id != req.auth.id) {
      throw generateError("No tienes permisos para editar esta noticia", 403);
    }
    if (req.files && req.files.photo) {
      try {
        const processedPhoto = await processAndSavePhoto(req.files.photo.data);
        await createNewPhoto(idNew, processedPhoto);
      } catch (err) {
        throw generateError(
          "Ha habido un problema guardando la Photo, inténtalo de nuevo",
          500
        );
      }
    } else {
      throw generateError("No se ha subido una Photo con el valor photo", 400);
    }

    res.send({
      status: "ok",
      message: "La Photo se ha subido correctamente",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = uploadPhotoNewController;
