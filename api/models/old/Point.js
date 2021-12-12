const mongoose = require("mongoose");

const pointSchema = new mongoose.Schema(
  {
    nombre: {
      type: Number,
      required: true,
      default: 250,
      min: 0,
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer value",
      },
    },

    hotesse: {
      type: mongoose.Types.ObjectId,
      ref: "utilisateur",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("point", pointSchema);
