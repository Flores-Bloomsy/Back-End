process.loadEnvFile();
const { sign, verify } = require("jsonwebtoken");
const createError = require("http-errors");
const { JWT_SECRET } = process.env;

if (!JWT_SECRET) throw createError(500, "JWT_SECRET is not defined");

function createjwt(payload) {
  return sign(payload, JWT_SECRET, { expiresIn: "1w" });
}
function verifyToken(token) {
  return verify(token, JWT_SECRET);
}

module.exports = {
  createjwt,
  verifyToken,
};
