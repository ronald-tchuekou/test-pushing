const mongoose = require("mongoose");

const avisSchema = new mongoose.Schema(
  {
    coiffeuse: {
      type: mongoose.Types.ObjectId,
      ref: "utilisateur",
      required: true,
    },

    note: {
      type: Number,
      required: true,
    },

    commentaire: {
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

module.exports = mongoose.model("avis", avisSchema);
