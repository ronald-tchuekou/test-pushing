const mongoose = require("mongoose");

const prestationSchema = new mongoose.Schema(
  {
    prestation: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["PRESTATION", "TYPE"],
      required: true,
    },

    imageURL: {
      type: String,
      required: false,
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

module.exports = mongoose.model("prestation", prestationSchema);
