// const db = require("../models");
// const ProfilBeaute = db.profilBeaute;

// exports.addProfil = (req, res) => {
//   let profilBeaute = new ProfilBeaute({
//     client: req.userId,
//     natureCheveux: req.body.natureCheveux,
//     problematiqueCheveux: req.body.problematiqueCheveux,
//     textureCheveux: req.body.textureCheveux,
//     typeCheveux: req.body.typeCheveux,
//     longueurCheveux: req.body.longueurCheveux,
//   });
//   profilBeaute
//     .save()
//     .then((resultat) => {
//       res.status(201).json(resultat);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         message: "Oups!! une erreur est survenue",
//         error: err,
//       });
//     });
// };

// exports.getProfil = (req, res) => {
//   ProfilBeaute.find({ client: req.userId })
//     .exec()
//     .then((resultat) => {
//       return res.status(200).json(resultat);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         message: "Une erreur est survenue",
//         error: err,
//       });
//     });
// };

const db = require("../models");
const { findOneAndReplace } = require("../models/Utilisateur");
const ProfilBeaute = db.profilBeaute;

exports.addProfil = (req, res) => {
  ProfilBeaute.findByIdAndRemove({});
};

exports.getProfil = (req, res) => {
  const id = req.params.id;
  ProfilBeaute.findById(id)
    .exec()
    .then((resultat) => {
      return res.status(200).json(resultat);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Une erreur est survenue",
        error: err,
      });
    });
};
