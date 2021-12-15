const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const ROLES = db.ROLES;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
    biographie: req.body.biographie,
    ville: req.body.ville,
    role: req.body.role,
    numero: req.body.numero,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    user.save((err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.send({ message: "User was registered successfully!" });
    });

    // if (req.body.role) {
    //   if (ROLES.includes(req.body.role)) {
    //     Role.findOne({ nom: req.body.role }, (err, role) => {
    //       if (err) {
    //         res.status(500).send({ message: err });
    //         return;
    //       }

    //       user.role = role._id;

    //     });
    //   } else {
    //     res.send({ message: "Role non definie" });
    //   }
    // }
  });
};

exports.getCurrentUser = (req, res) => {
  User.findById(req.userId)
    .select(
      "_id nom prenom email biographie imageURL domicile deplace ville status numero role createdAt updatedAt"
    )
    .populate("role", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      } else {
        res.status(200).send(user);
      }
    });
};

exports.getCoiffeuse = (req, res) => {
  User.findById(req.query.uid)
    .select(
      "_id nom prenom email biographie imageURL domicile deplace ville status numero role createdAt updatedAt"
    )
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      } else {
        res.status(200).send(user);
      }
    });
};

exports.changePassword = (req, res) => {
  User.findById(req.userId)
    .exec()
    .then((user) => {
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(400).send({
          message: "Ancien mot de passe incorrect.",
        });
      }
      let userData = {};
      userData.password = bcrypt.hashSync(req.body.newpassword, 8);
      console.log(req.userId);
      User.updateOne({ _id: req.userId }, { $set: userData })
        .exec()
        .then((resultat) => {
          if (!resultat)
            return res.status(404).json({
              message: "Oups!! aucune information pour l'identifiant fourni",
            });
          res.status(200).json({
            message: "Mise à jour reussie",
            doc: resultat,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            message: "Oups!! une erreur est survenue",
            error: err,
          });
        });
    });
};

exports.updateUser = (req, res) => {
  let userData = {};

  if (req.body.nom) userData.nom = req.body.nom;
  if (req.body.prenom) userData.prenom = req.body.prenom;
  if (req.body.biographie) userData.biographie = req.body.biographie;
  if (req.body.numero) userData.numero = req.body.numero;
  if (req.body.domicile) userData.domicile = req.body.domicile;
  if (req.body.deplace) userData.deplace = req.body.deplace;
  if (req.body.ville) userData.ville = req.body.ville;

  if (req.body._id !== req.userId) {
    return res.status(400).json({
      message: "Vous n'avez pas le droit de modifier un autre utilisateur",
    });
  }
  User.update({ _id: req.userId }, { $set: userData })
    .exec()
    .then((resultat) => {
      if (!resultat)
        return res.status(404).json({
          message: "Oups!! aucune information pour l'identifiant fourni",
        });
      res.status(200).json({
        message: "Mise à jour reussie",
        doc: resultat,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Oups!! une erreur est survenue",
        error: err,
      });
    });
};

exports.updateUserImage = (req, res) => {
  let userData = {};

  userData.imageURL = req.file.path;

  User.update({ _id: req.userId }, { $set: userData })
    .exec()
    .then((resultat) => {
      if (!resultat)
        return res.status(404).json({
          message: "Oups!! aucune information pour l'identifiant fourni",
        });
      res.status(200).json({
        message: "Mise à jour reussie",
        doc: resultat,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Oups!! une erreur est survenue sur le serveur",
        error: err,
      });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    // .populate("role", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res
          .status(404)
          .send({ message: "Nom d'utilisateur ou mot de passe incorrect." });
      }

      // if (!user.status) {
      //   return res.status(400).send({
      //     message: "Votre compte n'a pas encore été.",
      //   });
      // }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(400).send({
          accessToken: null,
          message: "Nom d'utilisateur ou mot de passe incorrect.",
        });
      }
      var token = jwt.sign(
        { id: user.id, role: user.role.nom },
        config.secret,
        {
          expiresIn: 86400, // 24 hours
        }
      );

      res.status(200).send({
        id: user._id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role,
        imageURL: user.imageURL,
        accessToken: token,
      });
    });
};
