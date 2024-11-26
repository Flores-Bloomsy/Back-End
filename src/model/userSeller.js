const { model, Schema } = require("mongoose");
const { isEmail } = require("validator");

const time24hoursRegex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;

const addressSchema = new Schema({
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
});

const scheduleSchema = new Schema({
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
});
const bankAccountSchema = new Schema({});

const userSellerSchema = new Schema(
  {
    storeName: {
      type: String,
    },
    logo: {
      type: String,
    },
    phone: {
      type: String,
      select: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail, "Correo no válido"],
    },
    password: {
      type: String,
      select: false,
      required: true,
    },
    emailValidate: {
      type: Boolean,
      default: false,
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
  },
  {
    timestamps: true,
  }
);

module.exports = model("userseller", userSellerSchema);
