const db = require("../models");
const Disponibilite = db.disponibilite;

exports.create = (req, res) => {
  const disponibilite = new Disponibilite({
    uid: req.userId,
    date: req.body.date,
    plage: req.body.plage,
  });

  disponibilite
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

exports.getAllDisponibilite = (req, res) => {
  const date = req.query.date;
  const plage = req.query.plage;
  Disponibilite.find({
    $and: [{ date: date }, { plage: plage }],
  })
    .populate("uid plage")
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

exports.getDisponibilite = (req, res) => {
  const id = req.params.id;
  Disponibilite.findById(id)
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

exports.deleteDisponibilite = (req, res) => {
  const id = req.params.id;
  Disponibilite.deleteOne({ _id: id })
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
