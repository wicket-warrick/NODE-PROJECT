const { createNewPhoto, getNewById } = require("../../db/news.js");
const { generateError } = require("../../helpers/generateError.js");
const { processAndSavePhoto } = require("../../helpers/processNewPhoto.js");

const uploadPhotoNewController = async (req, res, next) => {
  try {
    const { idNew } = req.params;
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
    if (req.files && req.files.photo) {
      try {
        const processedPhoto = await processAndSavePhoto(req.files.photo.data);
        await createNewPhoto(idNew, processedPhoto);
      } catch (err) {
        throw generateError(
          "Problema guardando la imagen.Por favor, inténtelo de nuevo más tarde.",
          500
        );
      }
    } else {
      res.send({
        status: "ok",
      });
    }

    res.send({
      status: "ok",
      message: "Imagen subida con exito.",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = uploadPhotoNewController;
