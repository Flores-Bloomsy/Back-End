const ShoppingCart = require("../model/shoppingCart.model");
const createError = require("http-errors");

// Crear un carrito de compras
exports.createCart = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const { items } = req.body;

    const cart = await ShoppingCart.findOne({ ownerId });
    if (cart) throw createError(400, "A cart already exists for this user.");

    const newCart = await ShoppingCart.create({ ownerId, items });

    res.json({
      success: true,
      message: "shopping cart created",
      data: newCart,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

// Todos los carritos
// exports.getCarts = async (req, res) => {
//   try {
//     const carts = await ShoppingCart.find().populate(
//       "ownerId items.bouquetFlowerId"
//     );
//     res.status(200).json(carts);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// Carrito por ownerId
exports.getCartById = async (req, res) => {
  try {
    const ownerId = req.user.id;
    console.log(ownerId);
    const cart = await ShoppingCart.findOne({ ownerId }).populate(
      "ownerId items.bouquetFlowerId"
    );

    if (!cart) throw createError(404, "Cart not found for the given ownerId");

    res.json({
      success: true,
      message: "cart get by owner id",
      data: cart,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

// Actualizar un carrito
// exports.updateCart = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedData = req.body;

//     const updatedCart = await ShoppingCart.findByIdAndUpdate(id, updatedData, {
//       new: true,
//     }).populate("ownerId items.bouquetFlowerId");

//     if (!updatedCart)
//       return res.status(404).json({ message: "Carrito no encontrado" });

//     res.status(200).json(updatedCart);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// Eliminar un carrito
// exports.deleteCart = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deletedCart = await ShoppingCart.findByIdAndDelete(id);

//     if (!deletedCart)
//       return res.status(404).json({ message: "Carrito no encontrado" });

//     res.status(200).json({ message: "Carrito eliminado" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// Agregar un producto al carrito
exports.addProductToCart = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const { bouquetFlowerId, quantity } = req.body;

    const cart = await ShoppingCart.findOne({ ownerId });

    if (!cart) throw createError(404, "carrito no encontrado");

    // Verificar si el producto ya está en el carrito
    const existingItem = cart.items.find(
      (item) => item.bouquetFlowerId.toString() === bouquetFlowerId
    );

    if (existingItem) {
      // Si el producto ya existe, aumentar la cantidad
      existingItem.quantity += quantity;
    } else {
      // Si no existe, agregar un nuevo producto
      cart.items.push({ bouquetFlowerId, quantity });
    }

    const updatedCart = await cart.save();
    res.json({
      success: true,
      message: "added product",
      data: updatedCart,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

// Modificar la cantidad de un producto en el carrito
exports.updateProductQuantity = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const { bouquetFlowerId, quantity } = req.body;

    const cart = await ShoppingCart.findOne({ ownerId });

    if (!cart) throw createError(404, "Carrito no encontrado");

    const item = cart.items.find(
      (item) => item.bouquetFlowerId.toString() === bouquetFlowerId
    );

    if (!item) throw createError(404, "el producto no esta en el carrito");

    // Actualizar la cantidad
    item.quantity = quantity;
    const updatedCart = await cart.save();
    res.json({
      success: true,
      message: "modified quantity",
      data: updatedCart,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      succes: false,
      message: error.message,
    });
  }
};

// Eliminar un producto del carrito
exports.removeProductFromCart = async (req, res) => {
  try {
    const { bouquetId } = req.params;
    const ownerId = req.user.id;

    const cart = await ShoppingCart.findOne({ ownerId });
    console.log(cart.items);

    //verificar que el ramo exista en el carrito
    const existBouquet = cart.items.find(
      (item) => item.bouquetFlowerId.toString() === bouquetId
    );
    if (!existBouquet)
      throw createError(404, "el producto no esta en el carrito");

    if (!cart) throw createError(404, "carrito no encontrado");

    // Filtrar los productos para eliminar el indicado
    cart.items = cart.items.filter(
      (item) => item.bouquetFlowerId.toString() !== bouquetId
    );

    const updatedCart = await cart.save();
    res.json({
      success: true,
      message: "bouquet deleted",
      data: updatedCart,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      succes: true,
      message: error.message,
    });
  }
};
