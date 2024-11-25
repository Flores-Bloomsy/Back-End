process.loadEnvFile();
const { Types } = require("mongoose");
const createError = require("http-errors");
const UserSeller = require("../model/userSeller");
const { encrypt, compare } = require("../lib/encryption");
const { createjwt } = require("../lib/jwt");

async function createNewUserSeller(data) {
  const existEmail = await UserSeller.findOne({ email: data.email });

  if (existEmail) throw createError(400, "user already exists");

  const hash = encrypt(data.password);
  data.password = hash;

  const newUserSeller = await UserSeller.create(data);

  return newUserSeller;
}

async function login(data) {
  const user = await UserSeller.findOne({ email: data.email }).select(
    "+password"
  );
  if (!user) throw createError(401, "invalid credential");

  const isValidPassword = compare(data.password, user.password);
  if (!isValidPassword) throw createError(401, "invalid credential");

  const token = createjwt({ id: user._id });

  return token;
}

async function getById(id) {
  if (!Types.ObjectId.isValid(id)) throw createError(400, "Invalid ID format");

  const user = await UserSeller.findById(id);
  if (!user) throw createError(404, "user not found");

  return user;
}

module.exports = {
  createNewUserSeller,
  login,
  getById,
};
