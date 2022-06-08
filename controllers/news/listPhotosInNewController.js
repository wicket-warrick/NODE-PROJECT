const { getPhotosInNew } = require("../../db/news");
const { generateError } = require("../../helpers/generateError");

const listPhotosInNewController = async (req, res, next) => {
  try {
    const { idNew } = req.params;

    const listOfPhotos = await getPhotosInNew(idNew);

    if (!listOfPhotos[0].length) {
      throw generateError(
        `La noticia con id:${idNew}, no contiene imágenes`,
        404
      );
    }
    res.send({
      status: "ok",
      data: listOfPhotos[0],
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { listPhotosInNewController };
