const { Types } = require("mongoose");
const createError = require("http-errors");
const UserSeller = require("../model/userSeller");
const { encrypt, compare } = require("../lib/encryption");
const { createjwt } = require("../lib/jwt");

async function createNewUserSeller(data) {
  const allowedFields = ["email", "password"];
  const invalidFields = Object.keys(data).filter(
    (field) => !allowedFields.includes(field)
  );

  if (invalidFields.length > 0)
    throw createError(400, "Needed only password and email");

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

  const token = createjwt({ id: user._id, rol: user.rol });

  return token;
}

async function getById(id) {
  if (!Types.ObjectId.isValid(id)) throw createError(400, "Invalid ID format");

  const user = await UserSeller.findById(id);
  if (!user) throw createError(404, "user not found");

  return user;
}

async function updateById(id, updatedData, currentUserId) {
  if (updatedData.email || updatedData.password || updatedData.emailValidate) {
    throw createError(
      400,
      "You cannot update the email, password or emailValidate"
    );
  }

  const findUserSeller = await UserSeller.findById(id);
  if (!findUserSeller) throw createError(404, "user not Found");

  if (findUserSeller._id.toString() !== currentUserId._id.toString())
    throw createError(403, "You do not have permission to update this profile");

  const updateUserSeller = await UserSeller.findByIdAndUpdate(id, updatedData, {
    new: true,
  });

  return updateUserSeller;
}

module.exports = {
  createNewUserSeller,
  login,
  getById,
  updateById,
};
