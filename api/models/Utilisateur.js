const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: false,
      max: 255,
    },

    prenom: {
      type: String,
      required: true,
      max: 255,
    },

    role: {
      type: String,
      enum: ["cliente", "coiffeuse", "admin"],
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      min: 6,
      max: 255,
    },

    biographie: {
      type: String,
      required: false,
      max: 500,
    },

    imageURL: {
      type: String,
      default: "default.png",
    },

    // adresse: {
    //   type: String,
    //   required: true,
    // },

    domicile: {
      type: Boolean,
      required: false,
    },

    deplace: {
      type: Boolean,
      required: false,
    },

    ville: {
      type: String,
      required: true,
      max: 255,
    },

    // postal: {
    //   type: Number,
    //   required: true,
    //   max: 99999,
    // },

    status: {
      type: String,
      enum: ["AWAIT", "VALIDATE", "DELETE"],
      default: "AWAIT",
      required: false,
    },

    numero: {
      type: String,
      required: true,
      minlength: 9,
      maxlength: 10,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("utilisateur", userSchema);
