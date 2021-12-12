const mongoose = require("mongoose");

const formationSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
  },

  lien: {
    type: String,
    required: true
  }
},
{timestamps: true});

module.exports = mongoose.model("formation", formationSchema);