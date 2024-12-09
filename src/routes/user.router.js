const express = require("express");
const {
  signup,
  login,
  updateUserById,
  getById,
} = require("../usecases/user.usecases");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.patch("/update/:id", auth, updateUserById);
router.get("/:id", getById);

module.exports = router;
