const express = require("express");
const router = express.Router();
const shoppingCartController = require("./shoppingCart.controller");

router.post("/", shoppingCartController.createCart);
router.get("/", shoppingCartController.getCarts);
router.get("/:id", shoppingCartController.getCartById);
router.put("/:id", shoppingCartController.updateCart);
router.delete("/:id", shoppingCartController.deleteCart);

//productos dentro del carrito
router.post("/add-product", shoppingCartController.addProductToCart);
router.put("/update-product-quantity", shoppingCartController.updateProductQuantity);
router.post("/remove-product", shoppingCartController.removeProductFromCart);

module.exports = router;
