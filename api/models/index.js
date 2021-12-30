const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./Utilisateur");
db.role = require("./Role");
db.prestation = require("./Prestation");
db.prestaCoiffeuse = require("./Coiffeuse-Prestation");
db.disponibilite = require("./Disponibilite");
db.ville = require("./Ville");
db.galerie = require("./Galerie");
db.plage = require("./Plage");
db.message = require("./Message");
db.like = require("./Like");
db.avis = require("./Avis");
db.coupon = require("./Coupon");
// db.panier = require("./Panier");
// db.profilBeaute = require("./ProfilBeaute");

db.ROLES = ["cliente", "coiffeuse", "admin"];

module.exports = db;
