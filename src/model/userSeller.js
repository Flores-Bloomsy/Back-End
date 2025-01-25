const { model, Schema } = require("mongoose");
const { isEmail } = require("validator");
const crypto = require("crypto");

const time24hoursRegex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;

const addressSchema = new Schema(
  {
    street: {
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
    state: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const scheduleSchema = new Schema(
  {
    opening: {
      type: String,
      required: true,
      validate: [time24hoursRegex, "Formato de hora no válido"],
    },
    closing: {
      type: String,
      required: true,
      validate: [time24hoursRegex, "Formato de hora no válido"],
    },
  },
  { _id: false }
);
const bankAccountSchema = new Schema({}, { _id: false });

const userSellerSchema = new Schema(
  {
    storeName: {
      type: String,
    },
    profilePic: {
      type: String,
    },
    phone: {
      type: String,
    },
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail, "Correo no válido"],
      immutable: true,
    },
    password: {
      type: String,
      select: false,
      required: false,
    },
    google: {
      type: Boolean,
      default: false,
    },
    emailValidate: {
      type: Boolean,
      default: false,
    },
    rol: {
      type: String,
      default: "seller",
      immutable: true,
    },
    address: {
      type: addressSchema,
      required: false,
    },
    bankAccount: bankAccountSchema,
    schedule: {
      type: scheduleSchema,
      required: false,
    },
    paypalMerchantId: {
      type: String,
      required: false,
    },

    trackingId: {
      type: String,
      default: () => crypto.randomBytes(5).toString("hex"),
      unique: true,
    },
    legal_consents: {
      consent_type: {
        type: String,
        default: "SHARE_DATA_CONSENT",
      },
      granted: {
        type: Boolean,
        default: true,
      },
    },
    actionUrl: { type: String },
  },

  {
    timestamps: true,
  }
);

module.exports = model("userseller", userSellerSchema);
