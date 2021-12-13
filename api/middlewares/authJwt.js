const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "Vous devez vous connecter" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    // console.log(decoded)
    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user.role === "admin") {
      next();
      return;
    }

    res.status(403).send({ message: "Require Admin Role!" });
    return;
  });
};

isCoiffeuse = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user.role === "coiffeuse") {
      next();
      return;
    }

    res.status(403).send({ message: "Require Coiffeuse Role!" });
    return;
  });
};

isCliente = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user.role === "cliente") {
      next();
      return;
    }

    res.status(403).send({ message: "Require Cliente Role!" });
    return;
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isCoiffeuse,
  isCliente,
};
module.exports = authJwt;
