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

exports.getCoiffeuseDisponibilite = (req, res) => {
  const date = req.query.date;
  Disponibilite.find({
    $and: [{ date: date }, { uid: req.userId }],
  })
    .populate({ path: "plage", options: { sort: { index: -1 } } })
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

exports.getCoiffeuseDisponibiliteByUid = (req, res) => {
  const date = req.params.date;
  const uid = req.params.id;
  Disponibilite.find({
    $and: [{ date: date }, { uid: uid }],
  })
    .populate({ path: "plage", options: { sort: { index: -1 } } })
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

exports.getCoiffeuseAllDisponibiliteDate = (req, res) => {
  const uid = req.params.id;
  Disponibilite.find({ uid: uid })
    .distinct("date")
    .populate({ path: "plage", options: { sort: { index: -1 } } })
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
  const date = req.query.date;
  Disponibilite.remove({
    $and: [{ date: date }, { uid: req.userId }],
  })
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

exports.search = (req, res) => {
  const date = req.query.date;
  const plage = req.query.plage;
  Disponibilite.find({
    $and: [{ date: date }, { plage: plage }],
  })
    .populate("plage")
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
