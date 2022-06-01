const { createNew } = require("../../db/news");
const { createAndEditNewSchema } = require("../../validators/newValidator");

const createNewController = async (req, res, next) => {
  try {
    await createAndEditNewSchema.validateAsync(req.body);
    const { title, description, entradilla, topic } = req.body;
    const idNew = await createNew(
      req.auth.id,
      title,
      description,
      entradilla,
      topic
    );
    res.statusCode = 201;
    res.setHeader("Content-Location", `/new/${idNew}`);
    res.send({
      status: "ok",
      message: "Noticia publicada correctamente",
      idNew: idNew,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createNewController };
