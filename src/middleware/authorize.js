const createError = require("http-errors");

function authorize(rol) {
  return (req, res, next) => {
    try {
      const user = req.user;

      if (!user) throw createError(401, "user not authenticated");

      if (user.rol !== rol) throw createError(403, "Access denied");

      next();
    } catch (error) {
      res.status(error.status || 403).json({
        success: false,
        message: error.message,
      });
    }
  };
}

module.exports = authorize;
