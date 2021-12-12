const mongoose = require("mongoose");

const panierSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Types.ObjectId,
      ref: "utilisateur",
      required: true,
    },
    produit: {
      type: mongoose.Types.ObjectId,
      ref: "produit",
      required: true,
    },
    qte: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer value",
      },
    },
    status: {
      type: String,
      enum: ["AWAIT", "VALIDATE"],
      default: "AWAIT",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("panier", panierSchema);
