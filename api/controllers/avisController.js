const db = require("../models");
const Avis = db.avis;

exports.createAvis = (req, res) => {
  const avis = new Avis({
    coiffeuse: req.body.coiffeuse,
    cliente: req.body.cliente,
    note: req.body.note,
    commentaire: req.body.commentaire,
  });
  avis.save().then((resultat) => {
    return res.status(201).json(resultat);
  });
};

exports.getAllCoiffeuseAvis = (req, res) => {
  const cid = req.params.cid;
  Avis.find({ coiffeuse: cid, publish: "PUBLISH" })
    .populate("coiffeuse cliente")
    .exec()
    .then((result) => {
      return res.status(200).json(result);
    });
};

exports.getAllAvis = (req, res) => {
  Avis.find()
    .populate("coiffeuse cliente")
    .exec()
    .then((result) => {
      return res.status(200).json(result);
    });
};

exports.getAllAwiatAvis = (req, res) => {
  Avis.find({ publish: "AWAIT" })
    .populate("coiffeuse cliente")
    .exec()
    .then((result) => {
      return res.status(200).json(result);
    });
};

exports.deleteAvis = (req, res) => {
  Avis.deleteOne({ _id: req.params.id }).then((result) => {
    return res.status(200).json(result);
  });
};

exports.publishAvis = (req, res) => {
  Avis.updateOne({ _id: req.params.id }, { $set: { publish: "PUBLISH" } }).then(
    (result) => {
      return res.status(200).json(result);
    }
  );
};

exports.sendDemande = (req, res) => {};
