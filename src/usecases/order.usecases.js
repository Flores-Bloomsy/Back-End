const Order = require("../model/order.model");
const BouquetFlower = require("../model/bouquet.model");
const User = require("../model/userBuyer");

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

  const newOrder = (await Order.create(data)).populate(
    "products.productId products.sellerId"
  );
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

//obtiene ordenes por el id del vendedor
async function getOrdersBySellerId(sellerId) {
  console.log(sellerId);
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

module.exports = {
  createNewOrder,
  updateShippingStatus,
  getOrdersByBuyerId,
  getOrdersBySellerId,
};
