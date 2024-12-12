const { model, Schema, default: mongoose } = require("mongoose");

itemsSchema = new Schema(
  {
    bouquetFlowerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bouquetflower",
      required: [
        true,
        "El campo 'bouquetFlowerId' es obligatorio para cada ítem.",
      ],
    },
    quantity: {
      type: Number,
      required: [true, "El campo 'quantity' es obligatorio para cada ítem."],
      min: [1, "La cantidad mínima permitida es 1."],
    },
  },
  { _id: false }
);

const shoppingCartSchema = new Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "El campo 'ownerId' es obligatorio."],
    unique: true,
  },
  items: [itemsSchema],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("shoppingcart", shoppingCartSchema);
