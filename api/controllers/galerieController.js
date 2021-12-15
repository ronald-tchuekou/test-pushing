const db = require("../models");
const Galerie = db.galerie;

exports.create = (req, res) => {
  const imageURL = req.body.imageURL;
  const galerie = new Galerie({
    imageURL: imageURL,
    uid: req.userId,
  });

  galerie
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

exports.getGalerie = (req, res) => {
  Galerie.find({ uid: req.userId })
    .populate("uid")
    .exec()
    .then((resultats) =>
      res.status(200).json({
        count: resultats.length,
        data: resultats,
      })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Oups!! une erreur est survenue",
        error: err,
      });
    });
};

exports.deleteGalerie = (req, res) => {
  const id = req.params.id;
  Galerie.remove({
    $and: [{ _id: id }, { uid: req.userId }],
  })
    .exec()
    .then((resultats) =>
      res.status(200).json({
        count: resultats.length,
        data: resultats,
      })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Oups!! une erreur est survenue",
        error: err,
      });
    });
};
