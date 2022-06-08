const { getLastNewsOrderByVotes } = require("../../db/news");
const { generateError } = require("../../helpers/generateError");

const listLastNewsByVotesController = async (req, res, next) => {
  try {
    const { modifiedAt } = req.query;

    const news = await getLastNewsOrderByVotes(modifiedAt);
    if (!news.length) {
      throw generateError("No hay resultados.", 404);
    }

    res.send({
      status: "ok",
      data: news,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { listLastNewsByVotesController };
