const Order = require("../model/order.model");
const BouquetFlower = require("../model/bouquet.model");
const User = require("../model/userBuyer");
const { createQR } = require("../lib/createQR");
const createError = require("http-errors");

//crear una nueva orden
async function createNewOrder(data) {
  // Verificar que el usuario existe
  const existUser = await User.findById(data.customerId);
  if (!existUser) {
    throw createError(404, "User with the specified ID was not found");
  }
  //itera en el array de products, y verifica si el produto que se pasa en realizad existe
  for (const product of data.products) {
    if (!product.productId) {
      throw createError(400, "Product ID is missing in the product data");
    }

    const foundProduct = await BouquetFlower.findById(product.productId);

    if (!foundProduct) {
      throw createError(404, "One or more products not found");
    }
    console.log(foundProduct.ownerId);
    product.sellerId = foundProduct.ownerId;

    // Verificar si hay suficiente stock
    if (foundProduct.stock < product.quantity) {
      throw createError(400, `no tiene stock suficiente ${foundProduct.name}`);
    }

    // Restar la cantidad comprada del stock
    foundProduct.stock -= product.quantity;
    await foundProduct.save();
  }

  // **Lógica para agrupar los productos por sellerId y calcular pagos**
  const sellerPayments = data.products.reduce((acc, product) => {
    const { sellerId, totalPrice } = product;
    if (!acc[sellerId]) {
      acc[sellerId] = 0;
    }
    acc[sellerId] += totalPrice;
    return acc;
  }, {});

  console.log("asas", { sellerPayments });

  const newOrder = new Order(data);

  await newOrder.save();

  await newOrder.populate("products.productId products.sellerId");
  return newOrder;
}

//actualizar estado del envio
async function updateShippingStatus(
  orderId,
  productOwnerId,
  newShippingStatus
) {
  const existOrder = await Order.findById(orderId);

  if (!existOrder) throw createError(404, "order not found");

  let isAuthorized = false;

  //iterar sobre el array de productos
  for (const product of existOrder.products) {
    if (product.sellerId.toString() === productOwnerId) {
      isAuthorized = true;
      // Actualizar el estado de envío si el vendedor es autorizado
      product.shippingStatus = newShippingStatus.shippingStatus;
    }
  }

  if (!isAuthorized) {
    throw createError(403, "You are not authorized to update this product");
  }
  await existOrder.save();

  return existOrder;
}

//obtiene ordenes por el id del comprador
async function getOrdersByBuyerId(buyerId) {
  const findOrders = await Order.find({ customerId: buyerId });

  if (!findOrders.length) throw createError(404, "orders not found");

  return findOrders;
}

const getOrderById = async (id) => {
  // console.log("orden id", id);
  try {
    const order = await Order.findById(id);
    return order;
  } catch (error) {
    throw createError(404, "orders not found");
  }
};

//obtiene ordenes por el id del vendedor
async function getOrdersBySellerId(sellerId) {
  //console.log(sellerId);
  const findOrders = await Order.find({
    products: {
      $elemMatch: {
        sellerId,
      },
    },
  });
  if (!findOrders.length) throw createError(404, "orders not found");

  return findOrders;
}

// Actualizar el paypalTransactionId de una orden

async function updatePaypalTransactionId(
  orderId,
  paypalTransactionId,
  paymentStatus
) {
  const existOrder = await Order.findById(orderId);

  if (!existOrder) {
    throw createError(404, "Order not found");
  }

  existOrder.paypalTransactionId = paypalTransactionId;
  existOrder.paymentStatus = paymentStatus;

  if (paymentStatus === "COMPLETED") {
    existOrder.orderStatus = "COMPLETED";
  } else {
    existOrder.orderStatus = "PENDING";
  }

  await existOrder.save();

  return existOrder;
}

async function getCustomMessageById(id) {
  const findOrder = await Order.findById(id).populate("customerId");

  if (!findOrder) throw createError(404, "orden no encontrada");

  const customMessage = {
    message: findOrder.customMessage,
    sender: findOrder.customerId?.name,
    receiver: findOrder.shippingAddress?.name,
  };

  return customMessage;
}

async function addCustomMessageById(id, customMessage, customerId) {
  const findOrder = await Order.findById(id);

  if (!findOrder) throw createError(404, "orden no encontrada");

  if (findOrder.customerId.toString() !== customerId.toString())
    throw createError(403, "you don't have permission to add message custom");

  const qrCode = await createQR(id);
  const newData = { qrCode, customMessage };
  console.log(newData);

  const addMessage = await Order.findByIdAndUpdate(
    id,
    { $set: newData },
    { new: true }
  );
  console.log("asdd", addMessage);
  return addMessage;
}

async function getAllOrders() {
  const orders = await Order.find().select("_id");

  if (!orders.length) throw createError(404, "orders not found");
  return orders;
}

module.exports = {
  createNewOrder,
  updateShippingStatus,
  getOrdersByBuyerId,
  getOrdersBySellerId,
  updatePaypalTransactionId,
  getCustomMessageById,
  addCustomMessageById,
  getOrderById,
  getAllOrders,
};
