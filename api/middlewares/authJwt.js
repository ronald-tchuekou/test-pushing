const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
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

    Role.findById(user.role).exec((err, roles) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (roles.nom === "admin") {
        next();
        return;
      }

      res.status(403).send({ message: "Require Admin Role!" });
      return;
    });
  });
};

isHotesse = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.findById(user.role).exec((err, roles) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (roles.nom === "hotesse") {
        next();
        return;
      }

      res.status(403).send({ message: "Require Hotesse Role!" });
      return;
    });
  });
};

isConseillere = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.findById(user.role).exec((err, roles) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (roles.nom === "conseillere") {
        next();
        return;
      }

      res.status(403).send({ message: "Require Conseillere Role!" });
      return;
    });
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isHotesse,
  isConseillere,
};
module.exports = authJwt;
