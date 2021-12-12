const mongoose = require("mongoose");

const profilBeauteSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Types.ObjectId,
      ref: "utilisateur",
      required: true,
    },

    natureCheveux: {
      type: String,
      required: true,
    },

    problematiqueCheveux: {
      type: String,
      required: true,
    },

    textureCheveux: {
      type: String,
      required: true,
    },

    typeCheveux: {
      type: String,
      required: true,
    },

    longueurCheveux: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("profilBeaute", profilBeauteSchema);
