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

    plage: {
      type: mongoose.Types.ObjectId,
      ref: "plage",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("disponibilite", disponibiliteSchema);
