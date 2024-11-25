const { verifyToken } = require("../lib/jwt");
const createError = require("http-errors");
const userSellerUseCases = require("../usecases/userSeller.usecases");

async function auth(req, res, next) {
  try {
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "");

    if (!token) throw createError(401, "you need to log in");

    const payload = verifyToken(token);
    const userSeller = await userSellerUseCases.getById(payload.id);

    if (!userSeller) throw createError(404, "user not found");

    req.userSeller = userSeller;
    next();
  } catch (error) {
    res.status(error.status || 401).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = auth;
