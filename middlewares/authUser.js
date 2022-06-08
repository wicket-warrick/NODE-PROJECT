const jwt = require("jsonwebtoken");
const { generateError } = require("../helpers/generateError");
const authUser = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw generateError("Falta o header 'authorization'", 401);
    }
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer" || !token) {
      throw generateError(
        "El formato del header 'authorization' es 'Bearer TOKEN'",
        401
      );
    }
    let tokenInfo;

    try {
      tokenInfo = jwt.verify(token, process.env.API_SECRET);
    } catch (e) {
      throw generateError("El token no es valido", 401);
    }
    req.auth = tokenInfo;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authUser };
