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
      required: true,
    },
    address: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      phone: {
        type: String,
      },
      favorites: [
        { type: mongoose.Schema.Types.ObjectId, ref: "flowerBouquetSchema" },
      ],
      postalCode: { type: String },
      country: { type: String },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = model("User", userBuyer);

module.exports = User;
