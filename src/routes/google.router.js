const express = require("express");
const { googleVerify } = require("../../services/google-verify");
const User = require("../model/userBuyer");
const userSeller = require("../model/userSeller");
const { createjwt } = require("../lib/jwt");
const shoppingCartModel = require("../model/shoppingCart.model");

const router = express.Router();

router.post("/google", async (req, res) => {
  try {
    const { id_token } = req.body;

    if (!id_token) {
      return res.status(400).json({
        success: false,
        message: "El id_token es obligatorio",
      });
    }

    const { name, profilePic, email } = await googleVerify(id_token);
    let user = await User.findOne({ email });

    if (!user) {
      // Tengo que crearlo
      const data = {
        name,
        email,
        password: "",
        profilePic,
        google: true,
      };

      user = new User(data);
      await user.save();
      // Crear un carrito vacío para el nuevo usuario
    } else {
      // El usuario existe, podemos actualizar la información si es necesario
      user.profilePic = profilePic; // ejemplo de actualización
      user.name = name; // ejemplo de actualización

      await user.save(); // actualizamos el usuario si es necesario
    }

    // generar token
    const token = createjwt({ id: user._id, rol: user.rol });
    //console.log(token);

    await user.save();

    res.json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Error interno del servidor",
    });
  }
});

// registro de vendedor
router.post("/google/seller", async (req, res) => {
  try {
    const { id_token } = req.body;

    if (!id_token) {
      return res.status(400).json({
        success: false,
        message: "El id_token es obligatorio",
      });
    }

    // console.log("ID Token recibido:", id_token);

    const { name, profilePic, email } = await googleVerify(id_token);
    let Seller = await userSeller.findOne({ email });

    // console.log("Seller encontrado:", Seller);

    if (!Seller) {
      // Tengo que crearlo
      const data = {
        name,
        email,
        password: "",
        profilePic,
        google: true,
      };

      Seller = new userSeller(data);
      await Seller.save();
    } else {
      Seller.profilePic = profilePic;
      Seller.name = name;

      await Seller.save();
    }

    // generar token
    const token = createjwt({ id: Seller._id, rol: Seller.rol });
    //console.log("Token generado:", token);
    //console.log("seller:", Seller);

    res.json({
      success: true,
      Seller,
      token,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Error interno del servidor",
    });
  }
});

module.exports = router;
