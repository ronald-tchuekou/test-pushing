const mongoose = require("mongoose");

const VilleSchema = new mongoose.Schema({
  nom: {
    type: String,
    default: "user",
    required: true,
  },
  checked: {
    type: Boolean,
    required: false,
    default: false,
  },
  status: {
    type: String,
    enum: ["VILLE", "SUBVILLE"],
    required: true,
  },
  type: [
    {
      type: mongoose.Types.ObjectId,
      ref: "ville",
      required: true,
    },
  ],
});

module.exports = mongoose.model("ville", VilleSchema);
