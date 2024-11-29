const ShoppingCart = require("./shoppingCart.model");

// Crear un carrito de compras
exports.createCart = async (req, res) => {
  try {
    const { userId, items } = req.body;

    const newCart = new ShoppingCart({ userId, items });
    const savedCart = await newCart.save();

    res.status(201).json(savedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Todos los carritos
exports.getCarts = async (req, res) => {
  try {
    const carts = await ShoppingCart.find().populate("userId items.BouquetFlowerId");
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Carrito por ID
exports.getCartById = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await ShoppingCart.findById(id).populate("userId items.BouquetFlowerId");

    if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un carrito
exports.updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedCart = await ShoppingCart.findByIdAndUpdate(id, updatedData, { new: true }).populate(
      "userId items.BouquetFlowerId"
    );

    if (!updatedCart) return res.status(404).json({ message: "Carrito no encontrado" });

    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un carrito
exports.deleteCart = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCart = await ShoppingCart.findByIdAndDelete(id);

    if (!deletedCart) return res.status(404).json({ message: "Carrito no encontrado" });

    res.status(200).json({ message: "Carrito eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
