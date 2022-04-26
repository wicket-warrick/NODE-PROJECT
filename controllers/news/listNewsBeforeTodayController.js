const { getNewsBeforeToday } = require("../../db/news");
const { generateError } = require("../../helpers/generateError");

const listNewsBeforeTodayController = async (req, res, next) => {
  try {
    const { modifiedAt } = req.query;

    const news = await getNewsBeforeToday(modifiedAt);
    if (!news.length) {
      throw generateError("No hay resultados", 404);
    }

    res.send({
      status: "ok",
      data: news,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { listNewsBeforeTodayController };
