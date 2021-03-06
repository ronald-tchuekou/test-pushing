const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    cliente: {
      type: mongoose.Types.ObjectId,
      ref: "utilisateur",
      required: true,
    },
    coiffeuse: {
      type: mongoose.Types.ObjectId,
      ref: "utilisateur",
      required: true,
    },
    prestation: {
      type: mongoose.Types.ObjectId,
      ref: "coiffeuse-prestation",
      required: true,
    },
    disponibilite: {
      type: mongoose.Types.ObjectId,
      ref: "plage",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    reduction: {
      type: mongoose.Types.ObjectId,
      ref: "coupon",
    },
    status: {
      type: String,
      enum: ["AWAIT", "VALIDATE", "REFUSE", "FINISH"],
      default: "AWAIT",
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("reservation", reservationSchema);
