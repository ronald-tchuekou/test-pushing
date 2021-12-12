const mongoose = require("mongoose");

const catalogueSchema = new mongoose.Schema(
  {
    produit: {
      type: mongoose.Types.ObjectId,
      ref: "produit",
      required: true,
    },

    qte: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("catalogue", catalogueSchema);
