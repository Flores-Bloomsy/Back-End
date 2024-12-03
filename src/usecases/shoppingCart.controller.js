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

// Agregar un producto al carrito
exports.addProductToCart = async (req, res) => {
  try {
    const { cartId, BouquetFlowerId, quantity } = req.body;

    const cart = await ShoppingCart.findById(cartId);

    if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });

    // Verificar si el producto ya está en el carrito
    const existingItem = cart.items.find((item) => item.BouquetFlowerId.toString() === BouquetFlowerId);

    if (existingItem) {
      // Si el producto ya existe, aumentar la cantidad
      existingItem.quantity += quantity;
    } else {
      // Si no existe, agregar un nuevo producto
      cart.items.push({ BouquetFlowerId, quantity });
    }

    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Modificar la cantidad de un producto en el carrito
exports.updateProductQuantity = async (req, res) => {
  try {
    const { cartId, BouquetFlowerId, quantity } = req.body;

    const cart = await ShoppingCart.findById(cartId);

    if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });

    const item = cart.items.find((item) => item.BouquetFlowerId.toString() === BouquetFlowerId);

    if (!item) return res.status(404).json({ message: "Producto no encontrado en el carrito" });

    // Actualizar la cantidad
    item.quantity = quantity;

    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un producto del carrito
exports.removeProductFromCart = async (req, res) => {
  try {
    const { cartId, BouquetFlowerId } = req.body;

    const cart = await ShoppingCart.findById(cartId);

    if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });

    // Filtrar los productos para eliminar el indicado
    cart.items = cart.items.filter((item) => item.BouquetFlowerId.toString() !== BouquetFlowerId);

    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
