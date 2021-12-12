const mongoose = require("mongoose");

const atelierSchema = new mongoose.Schema(
  {
    conseillere: {
      type: mongoose.Types.ObjectId,
      ref: "utilisateur",
      require: true,
    },

    hotesse: {
      type: mongoose.Types.ObjectId,
      ref: "utilisateur",
      require: true,
    },

    adresse: {
      type: String,
      require: true,
    },

    ville: {
      type: String,
      require: true,
    },

    status: {
      type: String,
      enum: ["LIGNE", "DOMICILE"],
      default: "DOMICILE",
      required: true,
    },

    place: {
      type: Number,
      required: true,
      min: 1,
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer value",
      },
    },

    placeTotale: {
      type: Number,
      required: true,
      min: 1,
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer value",
      },
    },

    theme: {
      type: String,
      required: true,
    },

    heure: {
      type: Number,
      required: true,
      max: 23,
      min: 00,
    },

    description: {
      type: String,
      require: true,
    },

    date: {
      type: Date,
      required: true,
    },

    participant: [
      {
        type: mongoose.Types.ObjectId,
        ref: "utilisateur",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("atelier", atelierSchema);
