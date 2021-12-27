const db = require("../models");
const User = db.reservation;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};
