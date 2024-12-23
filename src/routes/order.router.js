const express = require("express");
const orderUseCases = require("../usecases/order.usecases");
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const router = express.Router();

//crear una orden
router.post("/new-order", auth, authorize("buyer"), async (req, res) => {
  try {
    const customerId = req.user.id;
    const data = req.body;

    const orderData = {
      ...data,
      customerId,
    };
    console.log(orderData);

    const newOrder = await orderUseCases.createNewOrder(orderData);

    res.json({
      success: true,
      message: "new order created",
      data: newOrder,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
});

//actualizar estado de envios de los ramos
router.patch(
  "/update-shipping/:orderId",
  auth,
  authorize("seller"),
  async (req, res) => {
    try {
      const { orderId } = req.params;
      const sellerId = req.user.id;
      const shippingStatus = req.body;

      const updateShipping = await orderUseCases.updateShippingStatus(
        orderId,
        sellerId,
        shippingStatus
      );
      res.json({
        success: true,
        message: "update shipping status",
        data: updateShipping,
      });
    } catch (error) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

// obtener las ordenes por el usuario comprador (historial de compras)
router.get("/orders-by-buyer", auth, authorize("buyer"), async (req, res) => {
  try {
    const buyerId = req.user.id;
    const orders = await orderUseCases.getOrdersByBuyerId(buyerId);

    res.json({
      success: true,
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
});

//obtener las ordenes por el vendedor (historial de ventas)
router.get("/orders-by-seller", auth, authorize("seller"), async (req, res) => {
  try {
    const sellerId = req.user.id;
    const orders = await orderUseCases.getOrdersBySellerId(sellerId);

    res.json({
      success: true,
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
});
module.exports = router;