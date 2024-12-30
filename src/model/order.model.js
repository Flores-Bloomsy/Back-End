const { Schema, model } = require("mongoose");
const crypto = require("crypto");
const updateOrderStatus = require("../middleware/updateOrderStatus");

// Subesquema para el producto
const productSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "bouquetflower",
      required: true,
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "userseller",
      required: true,
    },
    storeName: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    shippingStatus: {
      type: String,
      enum: ["pending", "shipped", "delivered"],
      default: "pending",
    },
  },
  { _id: false }
);

// Subesquema para la dirección de envío
const shippingAddressSchema = new Schema(
  {
    street: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

// Esquema de la orden
const orderSchema = new Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      default: () => crypto.randomBytes(5).toString("hex"),
    },

    customerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [productSchema],
    totalAmount: {
      type: Number,
      required: true,
    },
    shippingAddress: shippingAddressSchema,
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: ["pending", "shipped", "delivered"],
      default: "pending",
    },
    stripePaymentId: {
      type: String,
      required: true,
    },
    stripeChargeId: {
      type: String,
    },
    customMessage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.pre("save", updateOrderStatus);

module.exports = model("order", orderSchema);
