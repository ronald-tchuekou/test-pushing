const mongoose = require("mongoose");

const CouponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  isPercent: {
    type: Boolean,
    required: true,
    default: false,
  },
  amount: {
    type: Number,
    required: true,
  }, // if is percent, then number must be ≤ 100, else it’s amount of discount
  expireDate: {
    type: String,
    required: true,
    default: "",
  },
  remeningNumber: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  users: [
    {
      type: mongoose.Types.ObjectId,
      ref: "utilisateur",
    },
  ],
});

module.exports = mongoose.model("coupon", CouponSchema);
