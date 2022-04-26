const { voteNew } = require("../../db/news");

const voteNewController = async (req, res, next) => {
  try {
    const { idNew } = req.params;
    await voteNew(req.auth.id, idNew);
    res.statusCode = 201;
    res.send({
      status: "ok",
      message: "Voto correctamente contabilizado",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { voteNewController };
