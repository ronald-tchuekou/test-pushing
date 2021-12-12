const mongoose = require("mongoose");

const docSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['CONTRATS', 'FACTURES'],
    required: true,
  },

  lien: {
    type: String,
    required: true
  },

  conseillere: {
    type: mongoose.Types.ObjectId,
    ref: "utilisateur",
  },
},
{timestamps: true});

module.exports = mongoose.model("document", docSchema);