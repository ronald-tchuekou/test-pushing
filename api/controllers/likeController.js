const db = require("../models");
const Like = db.like;

exports.create = (req, res) => {
  const like = new Like({
    uid: req.userId,
    coiffeuse: req.body.coiffeuse,
  });

  like
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

exports.remove = (req, res) => {
  Like.deleteOne({ uid: req.userId, coiffeuse: req.params.coiffeuse })
    .exec()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Oups!! une erreur est survenue",
        error: err,
      });
    });
};

exports.getLike = (req, res) => {
  Like.find({ uid: req.userId, coiffeuse: req.params.coiffeuse })
    .populate("coiffeuse")
    .exec()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Oups!! une erreur est survenue",
        error: err,
      });
    });
};

exports.getAllLike = (req, res) => {
  Like.find({ uid: req.userId })
    .populate("coiffeuse")
    .exec()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Oups!! une erreur est survenue",
        error: err,
      });
    });
};
