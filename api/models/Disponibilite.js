const mongoose = require("mongoose");

const disponibiliteSchema = new mongoose.Schema(
  {
    uid: {
      type: mongoose.Types.ObjectId,
      ref: "utilisateur",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: "prestation",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("disponibilite", disponibiliteSchema);
