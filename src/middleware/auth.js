const { verifyToken } = require("../lib/jwt");
const createError = require("http-errors");
const userSellerUseCases = require("../usecases/userSeller.usecases");
const userUseCase = require("../usecases/user.usecases");

async function auth(req, res, next) {
  try {
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "");

    if (!token) throw createError(401, "you need to log in");

    const payload = verifyToken(token);

    let user = await userSellerUseCases.getById(payload.id);

    if (!user) {
      user = await userUseCase.getById(payload.id);
    }
    if (!user) throw createError(404, "user not found");

    req.user = user;
    next();
  } catch (error) {
    res.status(error.status || 401).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = auth;
