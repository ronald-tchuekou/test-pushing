const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const ROLES = db.ROLES;
const mongoose = require("mongoose");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const nodeMailer = require("nodemailer");
const smtpTransport = nodeMailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: {
    user: "lgmickala.pro@gmail.com",
    pass: "0WJn9QgTR5pwYM7L",
  },
});
const toMail = "noukimi.patrick@gmail.com";
const fromMail = "lgmickala.pro@gmail.com";

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
    user.save(async (err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      const htmlContent = `<div
      style="
        width: 100%;
        padding-left: 10px;
        padding-right: 10px;
        font-family: helvetica;
        color: #54514c;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      "
    >
      <div style="display: flex; justify-content: center; width: 100%">
        <img src="profil.svg" alt="" srcset="" />
      </div>

      <p style="color: #e8a22f; font-weight: 600; text-align: center">
        Bienvenue sur bigoodee !
      </p>
      <div>
        <p>Félicitations ${user.prenom}, votre compte a bien été crée.</p>
        <p>Bigoodee vous permet de :</p>
        <div style="display: flex; gap: 10px">
          <img src="./prestation.svg" alt="" srcset="" />
          <p>
            Découvrir et réserver la coiffeuse qui vous correspond en quelques
            clics;
          </p>
        </div>
        <div style="display: flex; gap: 5px">
          <img src="./boutique.svg" alt="" srcset="" />
          <p>D’acheter les meilleurs soins adaptés À vos cheveux.</p>
        </div>
      </div>
      <div>
        <button
          style="
            border-radius: 10px;
            background-color: #ff3e79;
            color: white;
            font-weight: 500;
            border: none;
            padding: 10px 20px;
          "
        >
          Découvrir les coiffures
        </button>
      </div>
    </div>`;
      try {
        let send = await smtpTransport.sendMail({
          from: "BiGooDee <lgmickala.pro@gmail.com",
          to: user.email,
          subject: "Bienvenue",
          // text: `${ville} a été suggéré comme ville`,
          html: htmlContent,
        });
        console.log(send);
        return res.send({ message: "User was registered successfully! cool" });
      } catch (error) {
        return res.send({ message: "User was registered successfully!" });
      }
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
  userData.domicile = req.body.domicile;
  userData.deplace = req.body.deplace;
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

  userData.imageURL = req.body.imageURL;

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
          //expiresIn: 86400, // 24 hours
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

exports.getAllUser = (req, res) => {
  // const id = mongoose.Types.ObjectId(req.userId);
  // console.log(id);
  User.find()
    // .select(
    //   "_id nom prenom email biographie imageURL domicile deplace ville status numero role createdAt updatedAt"
    // )
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send(user);
    });
};

exports.getAllCoiffeuse = (req, res) => {
  User.find({ role: "coiffeuse" })
    .sort({ prenom: 1 })
    .select(
      "nom prenom email biographie imageURL domicile deplace ville numero"
    )
    .exec()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Oups!! une erreur est survenue sur le serveur",
        error: err,
      });
    });
};

exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .select(
      "nom prenom email biographie imageURL domicile deplace ville numero createdAt"
    )
    .exec()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Oups!! une erreur est survenue sur le serveur",
        error: err,
      });
    });
};

exports.getAwaitCoiffeuse = (req, res) => {
  const status = req.query.status || "AWAIT";

  User.find({
    $and: [{ role: "coiffeuse" }, { status: status }],
  })
    .select(
      "nom prenom email biographie imageURL domicile deplace ville numero createdAt"
    )
    .exec()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Oups!! une erreur est survenue sur le serveur",
        error: err,
      });
    });
};

exports.getAllCliente = (req, res) => {
  User.find({ role: "cliente" })
    .select("nom prenom email imageURL ville numero createdAt")
    .exec()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Oups!! une erreur est survenue sur le serveur",
        error: err,
      });
    });
};

exports.updateStatus = (req, res) => {
  const status = req.body.status;
  let userData = {};

  userData.status = status;

  User.update({ _id: req.params.uid }, { $set: userData })
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
