const mongoose = require("mongoose");

const plageSchema = new mongoose.Schema(
  {
    plage: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("plage", plageSchema);
