const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    coiffeuse: {
      type: mongoose.Types.ObjectId,
      ref: "utilisateur",
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

module.exports = mongoose.model("like", likeSchema);
