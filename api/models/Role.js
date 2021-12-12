const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
  nom: {
    type: String,
    default: "user",
    required: true
  },
});

module.exports = mongoose.model("role", RoleSchema);