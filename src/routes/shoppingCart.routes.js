const express = require("express");
const router = express.Router();
const shoppingCartController = require("../usecases/shoppingCart.controller");

router.post("/create-cart", shoppingCartController.createCart);
router.get("/get-cart", shoppingCartController.getCartById);

//productos dentro del carrito
router.post("/add-product/", shoppingCartController.addProductToCart);
router.patch(
  "/update-product-quantity/",
  shoppingCartController.updateProductQuantity
);
router.delete(
  "/remove-product/:bouquetId",
  shoppingCartController.removeProductFromCart
);
// router.get("/", shoppingCartController.getCarts);
// router.put("/:id", shoppingCartController.updateCart);
// router.delete("/:id", shoppingCartController.deleteCart);

module.exports = router;
