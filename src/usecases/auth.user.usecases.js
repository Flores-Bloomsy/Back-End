const User = require("../model/userBuyer");
const bcryptjs = require("bcryptjs");
const generateTokenAndSetCookie = require("../utils/generateTokenAndSetCookie");
// para registrarse
async function signup(req, res) {
  const { email, password, name } = req.body;

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

    const hashedPassword = await bcryptjs.hash(password, 10);
    // const verificationToken = Math.floor(
    //   100000 + Math.random() * 900000
    // ).toString();

    const user = new User({
      email,
      password: hashedPassword,
      name,
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

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "invalid credentials" });
    }

    generateTokenAndSetCookie(res, user._id);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("error in login", error);
    res.status(400).json({ success: false, message: error.message });
  }
}
// para terminar secion
async function logout(req, res) {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "logged out successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error logging out" });
  }
}

module.exports = {
  signup,
  login,
  logout,
};
