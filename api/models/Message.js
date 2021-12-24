const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    toId: {
      type: mongoose.Types.ObjectId,
      ref: "utilisateur",
      required: true,
    },
    fromId: {
      type: mongoose.Types.ObjectId,
      ref: "utilisateur",
      required: true,
    },
    message: {
      type: String,
      required: false,
    },
    imageURL: {
      type: String,
      required: false,
    },
    isRead: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("message", messageSchema);
