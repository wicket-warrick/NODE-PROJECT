const { getAllNews } = require("../../db/news");
const { generateError } = require("../../helpers/generateError");
const { topics } = require("../../validators/newValidator");

const listNewsController = async (req, res, next) => {
  try {
    // YYYY-MM-DD
    const { modifiedAt, topic } = req.query;

    if (topic) {
      if (!topics.includes(topic)) {
        throw generateError(
          `O parámetro topic debe  ser un dos seguintes:${topics}`,
          400
        );
      }
    }

    const news = await getAllNews(modifiedAt, topic);

    res.send({
      status: "ok",
      data: news,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = listNewsController;
