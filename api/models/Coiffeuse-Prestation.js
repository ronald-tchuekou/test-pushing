const mongoose = require("mongoose");

const prestationSchema = new mongoose.Schema(
  {
    prestation: {
      type: mongoose.Types.ObjectId,
      ref: "prestation",
      required: true,
    },

    tarif: {
      type: Number,
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

module.exports = mongoose.model("coiffeuse-prestation", prestationSchema);
