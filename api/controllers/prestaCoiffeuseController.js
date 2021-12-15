const req = require("express/lib/request");
const db = require("../models");
const PrestaCoif = db.prestaCoiffeuse;

exports.create = (req, res) => {
  const prestatCoif = new PrestaCoif({
    prestation: req.body.prestation,
    uid: req.userId,
    tarif: req.body.tarif,
  });

  prestatCoif
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

exports.getCoiffeusePresta = (req, res) => {
  PrestaCoif.find({
    uid: req.userId,
  })
    .populate("prestation uid")
    .exec((err, prsetation) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      return res.status(200).send(prsetation);
    });
};

exports.getSearchCoiffeusePresta = (req, res) => {
  const uid = req.query.uid;
  PrestaCoif.find({
    uid: uid,
  })
    .populate("prestation uid")
    .exec((err, prsetation) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      return res.status(200).send(prsetation);
    });
};

exports.deleteCoiffeusePresta = (req, res) => {
  const id = req.params.id;
  PrestaCoif.remove({
    $and: [{ _id: id }, { uid: req.userId }],
  }).exec((err, prsetation) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    return res.status(200).send(prsetation);
  });
};

exports.search = (req, res) => {
  const prest = req.query.prest;
  const uid = req.query.uid;
  PrestaCoif.find({
    uid: uid,
    prestation: prest,
  })
    .populate("prestation uid")
    .exec((err, prestation) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      return res.status(200).json(prestation);
    });
};
