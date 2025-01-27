const { model, Schema, mongoose } = require("mongoose");

const userBuyer = new Schema(
  {
    profilePic: { type: String },
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    google: {
      type: Boolean,
      default: false,
    },
    address: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      postalCode: {
        type: String,
      },
      state: {
        type: String,
      },
      number: {
        type: String,
      },
    },
    rol: {
      type: String,
      default: "buyer",
      immutable: true,
    },
    phone: {
      type: String,
    },
    favorites: [
      { type: mongoose.Schema.Types.ObjectId, ref: "flowerBouquetSchema" },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = model("User", userBuyer);

module.exports = User;
