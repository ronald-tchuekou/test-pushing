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
    checked: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("plage", plageSchema);
