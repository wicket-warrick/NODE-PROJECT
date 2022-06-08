const { getNewById } = require("../../db/news");
const { generateError } = require("../../helpers/generateError");

const newByIdController = async (req, res, next) => {
  try {
    const { idNew } = req.params;

    if (isNaN(parseInt(idNew))) {
      throw generateError("El parámetro 'id' debe ser un número.", 400);
    }

    const news = await getNewById(idNew);

    if (!news) {
      throw generateError(`No existe ninguna noticia con id:${idNew}`, 400);
    }
    res.send({
      status: "ok",
      data: news,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = newByIdController;
