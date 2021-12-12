const mongoose = require("mongoose");

const cadeauSchema = new mongoose.Schema(
  {
    produit: {
      type: mongoose.Types.ObjectId,
      ref: "produit",
      required: true,
    },

    hotesse: {
      type: mongoose.Types.ObjectId,
      ref: "utilisateur",
      required: true,
    },
    qte: {
      type: Number,
      required: true,
      default: 1,
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

module.exports = mongoose.model("cadeau", cadeauSchema);
