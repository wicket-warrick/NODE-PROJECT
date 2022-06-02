const { createNewPhoto, getNewById } = require("../../db/news.js");
const { generateError } = require("../../helpers/generateError.js");
const { processAndSavePhoto } = require("../../helpers/processNewPhoto.js");

const uploadPhotoNewController = async (req, res, next) => {
  try {
    const { idNew } = req.params;
    const New = await getNewById(idNew);
    if (!New) {
      throw generateError("Non exsite ninguna noticia con esa ID", 404);
    }
    if (New.user_id != req.auth.id) {
      throw generateError("Non tes permisos para editar esta noticia", 403);
    }
    if (req.files && req.files.photo) {
      try {
        const processedPhoto = await processAndSavePhoto(req.files.photo.data);
        await createNewPhoto(idNew, processedPhoto);
      } catch (err) {
        throw generateError(
          "Houbo un problema gardando a Photo, inténtalo de novo",
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
      message: "A imaxe subiuse correctamente",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = uploadPhotoNewController;
