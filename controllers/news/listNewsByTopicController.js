const { getNewsByTopic } = require("../../db/news");
const { generateError } = require("../../helpers/generateError");
const { topics } = require("../../validators/newValidator");

const getNewsByTopicController = async (req, res, next) => {
  try {
    const { topic } = req.query;

    if (!topics.includes(topic)) {
      throw generateError(
        `O parámetro topic debe  ser un dos seguintes:${topics}`,
        400
      );
    }

    const newsByTopic = await getNewsByTopic(topic);

    if (!newsByTopic) {
      throw generateError("Non existen noticias sobre ese tema", 404);
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
