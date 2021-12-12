const mongoose = require("mongoose");

const galerieSchema = new mongoose.Schema(
  {
    imageURL: {
      type: String,
      required: true,
    },

    uid: {
      type: mongoose.Types.ObjectId,
      ref: "utilisateur",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("galerie", galerieSchema);
