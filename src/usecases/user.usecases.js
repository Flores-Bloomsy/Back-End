const User = require("../model/userBuyer");
const bcryptjs = require("bcryptjs");
const UserBuyer = require("../model/userBuyer");
const { encrypt, compare } = require("../lib/encryption");
const { createjwt } = require("../lib/jwt");

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
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("error in login", error);
    res.status(400).json({ success: false, message: error.message });
  }
}

async function getById(id) {
  if (!Types.ObjectId.isValid(id)) throw createError(400, "Invalid ID format");

  const user = await UserBuyer.findById(id);
  if (!user) throw createError(404, "user not found ss");

  return user;
}

module.exports = {
  signup,
  login,
  getById,
};
