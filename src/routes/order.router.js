const express = require("express");
const orderUseCases = require("../usecases/order.usecases");
const Order = require("../model/order.model");
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const { createOrder } = require("../controllers/crearOrdenPaypal.controller");

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

// Obtener una orden específica por su ID
router.get("/order-by-id/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    // console.log("id de order", id);
    const order = await orderUseCases.getOrderById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Orden no encontrada",
      });
    }

    res.json({
      success: true,
      message: "Orden recuperada con éxito",
      data: order,
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
  console.log("as", req.user);
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

// Actualizar el paypalTransactionId
router.patch(
  "/update-paypal-transaction/:orderId",
  auth,
  authorize("buyer"),
  async (req, res) => {
    try {
      const { orderId } = req.params;
      const { paypalTransactionId, paymentStatus } = req.body;

      if (!paypalTransactionId) {
        return res.status(400).json({
          success: false,
          message: "paypalTransactionId is required",
        });
      }
      // Verificar si el pago fue exitoso
      if (paymentStatus === "COMPLETED") {
        // Lógica para actualizar la transacción y asociar el referido
        const updatedOrder = await orderUseCases.updatePaypalTransactionId(
          orderId,
          paypalTransactionId,
          paymentStatus
        );
        res.json({
          success: true,
          message: "order updated successfully",
          data: updatedOrder,
        });
      }
    } catch (error) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

router.get("/get-custom-message/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const message = await orderUseCases.getCustomMessageById(id);
    res.json({
      success: true,
      message: "message obtained successfull",
      data: message,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
});

router.post(
  "/add-customMessage/:id",
  auth,
  authorize("buyer"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { customMessage } = req.body;
      const customerId = req.user._id;

      const messageSent = await orderUseCases.addCustomMessageById(
        id,
        customMessage,
        customerId
      );
      res.json({
        success: true,
        message: "added custom message",
        data: messageSent,
      });
    } catch (error) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

//enviar datos a paypal
router.post("/create-payment", createOrder);

module.exports = router;
