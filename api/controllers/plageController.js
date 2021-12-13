const db = require("../models");
const Plage = db.plage;

exports.create = (req, res) => {
  const plage = new Plage({
    plage: req.body.plage,
    index: req.body.index,
  });

  plage
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

exports.getAllPlage = (req, res) => {
  Plage.find()
    .sort({ index: 1 })
    .exec()
    .then((resultats) => res.status(200).json(resultats))
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Oups!! une erreur est survenue",
        error: err,
      });
    });
};

exports.getPlage = (req, res) => {
  const id = req.params.id;
  Plage.findById(id)
    .exec()
    .then((resultats) => res.status(200).json(resultats))
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Oups!! une erreur est survenue",
        error: err,
      });
    });
};

exports.deletePlage = (req, res) => {
  const id = req.params.id;
  Plage.deleteOne({ _id: id })
    .exec()
    .then((resultats) => res.status(200).json(resultats))
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Oups!! une erreur est survenue",
        error: err,
      });
    });
};
