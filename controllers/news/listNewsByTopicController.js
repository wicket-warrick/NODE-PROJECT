const { getNewsByTopic } = require("../../db/news");
const { generateError } = require("../../helpers/generateError");
const { topics } = require("../../validators/newValidator");

const getNewsByTopicController = async (req, res, next) => {
  try {
    const { topic } = req.params;

    if (!topics.includes(topic)) {
      throw generateError(
        `El parámetro de la url topic tiene que estar incluido en:${topics}`,
        400
      );
    }

    const newsByTopic = await getNewsByTopic(topic);

    if (!newsByTopic) {
      throw generateError("No existen noticias sobre ese tema", 404);
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
