const { model, Schema, default: mongoose } = require("mongoose");

const shoppingCartSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userBuyer",
    required: true,
  },
  items: [
    {
      BouquetFlowerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "bouquetFlower",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  status: {
    type: String,
    enum: ["active", "completed"],
    default: "active",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});
