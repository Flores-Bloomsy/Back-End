const { verifyToken } = require("../lib/jwt");
const createError = require("http-errors");
const userSellerUseCases = require("../usecases/userSeller.usecases");
const User = require("../model/userBuyer");

async function auth(req, res, next) {
  try {
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "");

    if (!token) throw createError(401, "you need to log in");

    const payload = verifyToken(token);

    console.log(payload);
    let user;

    try {
      user = await userSellerUseCases.getById(payload.id);
      console.log("user1", user);
    } catch (error) {
      // si "getById" falla porque no encuentra el usuario, el middleware continua y no termina en este punto
      if (error.status !== 404) throw error;
    }

    if (!user) {
      try {
        user = await User.findById(payload.id);
        console.log("user2", user);
      } catch (error) {
        if (error.status !== 404) throw error;
      }
    }
    console.log("user1", user);

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
