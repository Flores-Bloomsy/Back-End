const express = require("express");
const userSellerUseCase = require("../usecases/userSeller.usecases");
const router = express.Router();
const auth = require("../middleware/auth");

//Sign on create new user seller
router.post("/", async (req, res) => {
  {
    try {
      const userData = req.body;
      const newUser = await userSellerUseCase.createNewUserSeller(userData);
      res.json({
        success: true,
        message: "user seller created",
        data: newUser,
      });
    } catch (error) {
      res.status(error.status || 500).json({
        succes: false,
        message: error.message,
      });
    }
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = req.body;
    const token = await userSellerUseCase.login(userData);
    res.json({
      success: true,
      message: "user logged in",
      token,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
});

router.patch("/update/:id", auth, async (req, res) => {
  try {
    const userId = req.params.id;
    const currentUserId = req.user;
    const updateData = req.body;

    const updateUserSeller = await userSellerUseCase.updateById(
      userId,
      updateData,
      currentUserId
    );

    res.json({
      success: true,
      message: "user update",
      data: updateUserSeller,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const user = await userSellerUseCase.getById(id);

    res.json({
      success: true,
      message: "user By Id",
      data: { user },
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
