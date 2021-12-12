const mongoose = require("mongoose");

const produitSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },

    imageURL: {
      type: String,
      default: "default.jpg",
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    prix: {
      type: Number,
      required: true,
    },

    unite: {
      type: String,
      enum: ["ml", "mg", "taille"],
      required: true,
    },

    capacite: {
      type: Number,
      required: true,
    },

    categorie: {
      type: String,
      enum: ["COIFFURES", "CAPILLAIRES"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("produit", produitSchema);
