// ShoppingCartUseCases.js
const ShoppingCart = require("../model/shoppingCart.model"); // Ajusta la ruta de acuerdo a tu estructura
const createError = require("http-errors"); // Usamos http-errors
const BouquetFlower = require("../model/bouquet.model");

// Función que maneja la creación del carrito
async function createCart({ ownerId, items }) {
  try {
    // Verifica si ya existe un carrito para el usuario
    const cart = await ShoppingCart.findOne({ ownerId });
    if (cart) {
      throw createError(400, "A cart already exists for this user."); // Error con código 400
    }

    // Crea un nuevo carrito
    const newCart = await ShoppingCart.create({ ownerId, items });

    return newCart; // Retorna el carrito creado
  } catch (error) {
    // Si ocurre un error, usamos createError para lanzar uno
    throw createError(500, error.message || "Error creating cart"); // Error con código 500
  }
}

module.exports = { createCart };
