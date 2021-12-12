const db = require("../models");
const Contact = db.contact;

exports.Hello_Word = (req, res) => {
  res.send("Hello Contact");
};

exports.addContact = (req, res) => {
  let contact = new Contact({
    nom: req.body.nom,
    email: req.body.email,
    objet: req.body.objet,
    message: req.body.message,
  });

  contact
    .save()
    .then((resultat) => {
      res.status(201).json(resultat);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Oups!! une erreur est survenue",
        error: err,
      });
    });
};

exports.get_contact = (req, res) => {
  Contact.find()
    .exec()
    .then((resultat) => {
      return res.status(200).json(resultat);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Une erreur est survenue",
        err: err,
      });
    });
};

exports.delete_contact = (req, res) => {
  const id = req.params.id;

  if (id.length != 24) {
    return res.status(400).send("Identifiant invalide");
  }
  Contact.remove({ _id: id })
    .exec()
    .then((resultat) => {
      res.status(200).json({
        message: "Suppression réussie",
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
