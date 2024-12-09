const User = require("../model/userBuyer");
const { encrypt, compare } = require("../lib/encryption");
const { createjwt } = require("../lib/jwt");
const createError = require("http-errors");
const { Types } = require("mongoose");
const { json } = require("express");

// para registrarse
async function signup(req, res) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new Error("All fields are required");
    }

    const userAlreadyExists = await User.findOne({ email });
    console.log("UserAlreadyExists", userAlreadyExists);
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = encrypt(password);
    // const verificationToken = Math.floor(
    //   100000 + Math.random() * 900000
    // ).toString();

    const user = new User({
      email,
      password: hashedPassword,
    });

    await user.save();

    //jwt

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}
//para iniciar secion
async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "invalid credentials" });
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "invalid credentials" });
    }
    // generar token
    const token = createjwt({ id: user._id, rol: user.rol });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
    });
  } catch (error) {
    console.log("error in login", error);
    res.status(400).json({ success: false, message: error.message });
  }
}

async function getById(req, res) {
  const userId = req.params.id;

  console.log(userId);
  if (!Types.ObjectId.isValid(userId))
    throw createError(400, "Invalid ID format");
  try {
    const user = await User.findById(userId);
    if (!user) throw createError(404, "user not found");

    res.json({
      success: true,
      message: "get user by id",
      data: { user },
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
}

async function updateUserById(req, res) {
  const id = req.params.id;
  const updateData = req.body;
  const currentUserId = req.user;

  console.log("id", id);
  console.log("currenid", currentUserId);

  try {
    const findUserBuyer = await User.findById(id);
    if (!findUserBuyer) throw createError(404, "user not found");

    if (findUserBuyer._id.toString() !== currentUserId._id.toString())
      throw createError(
        403,
        "You do not have permission to update this profile"
      );

    const updateUserBuyer = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.json({
      success: true,
      message: "user Buyer update",
      data: updateUserBuyer,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  signup,
  login,
  getById,
  updateUserById,
};
