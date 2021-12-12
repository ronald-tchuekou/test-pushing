const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send(`${req.role} Content.`);
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.validate = (req, res) => {
  const id = req.params.uid;
  var user = {};
  if (req.body.status) user.status = req.body.status;
  User.update({ _id: id }, { $set: user })
    .exec()
    .then((resultat) => {
      if (!resultat)
        return res.status(404).json({
          message: "Oups!! aucune information pour l'identifiant fourni",
        });
      res.status(200).json(resultat);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Oups!! une erreur est survenue",
        error: err,
      });
    });
};

exports.unvalidateConseiller = (req, res) => {
  User.find({
    $and: [{ status: false }],
  })
    .select(
      "_id nom prenom email imageURL adresse ville postal status numero role createdAt updatedAt"
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

exports.getTypeOfUsers = (req, res) => {
  const type = req.params.type;
  User.find({ status: true })
    .populate("role", "-__v")
    .select(
      "_id nom prenom email imageURL adresse ville postal status numero role createdAt updatedAt"
    )

    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user.length == 0) {
        return res.status(404).send({ message: "User Not found." });
      } else {
        var result = [];

        user.forEach((element) => {
          if (element.role.nom == type) {
            result.push(element);
          }
        });
        res.status(200).send(result);
      }
    });
};

exports.getUserById = (req, res) => {
  const uid = req.params.uid;
  User.findById(uid)
    .populate("role", "-__v")
    .select(
      "_id nom prenom email imageURL adresse ville postal status numero role createdAt updatedAt"
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
