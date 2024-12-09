const { model, Schema } = require("mongoose");

const detailsSchema = new Schema(
  {
    occasion: {
      type: [String],
      enum: [
        "Cumpleaños",
        "Condolencias",
        "Día de las madres",
        "Aniversarios",
        "Nuevo Bebé",
        "Reconciliación",
        "Agradecimiento",
        "Graduación",
        "Día de Muertos",
        "San Valentín",
        "Corporativo",
        "Boda",
      ],
    },
    size: {
      type: String,
      enum: ["Pequeño", "Mediano", "Grande"],
    },
    color: {
      type: [String],
      enum: [
        "Rojo",
        "Blanco",
        "Amarillo",
        "Rosa",
        "Azul",
        "Verde",
        "Naranja",
        "Morado",
        "Lavanda",
        "Coral",
        "Durazno",
        "Violeta",
        "Fucsia",
        "Burgundy",
        "Crema",
        "Champán",
      ],
    },
    style: {
      type: String,
      enum: [
        "Moderno",
        "Minimalista",
        "Rustico",
        "Elegante",
        "Clasico",
        "Vintage",
      ],
    },
    flowerType: {
      type: [String],
      enum: [
        "Rosas",
        "Tulipanes",
        "Orquídeas",
        "Lirios",
        "Margaritas",
        "Girasoles",
        "Claveles",
        "Hortensias",
        "Peonías",
        "Gladiolos",
        "Fresias",
        "Gerberas",
        "Crisantemos",
        "Anémonas",
        "Dalias",
        "Lavanda",
        "Jazmines",
        "Gardenias",
        "Alstroemerias",
        "Flor de Loto",
      ],
    },
    personality: {
      type: [String],
      enum: [
        "Alegre",
        "Romantico",
        "Elegante",
        "Encantador",
        "Tranquilo",
        "Dulce",
        "Atrevido",
        "Aventurero",
        "Exótico",
        "Juvenil",
      ],
    },
  },
  { _id: false }
);

const commentSchema = new Schema({
  authorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const flowerBouquetSchema = new Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "userseller",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    details: {
      type: detailsSchema,
      required: true,
    },
    comments: {
      type: [commentSchema],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("bouquetflower", flowerBouquetSchema);
