const { getNewsByTopic } = require("../../db/news");
const { generateError } = require("../../helpers/generateError");
const { topics } = require("../../validators/newValidator");

const getNewsByTopicController = async (req, res, next) => {
  try {
    const { topic } = req.query;

    if (!topics.includes(topic)) {
      throw generateError(
        `El campo 'Topic' es obligatorio. Las opciones disponibles son:${topics}`,
        400
      );
    }

    const newsByTopic = await getNewsByTopic(topic);

    if (!newsByTopic) {
      throw generateError(`No existen resultados para el topic ${topic}`, 404);
    }

    res.send({
      status: "ok",
      data: newsByTopic,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getNewsByTopicController };
