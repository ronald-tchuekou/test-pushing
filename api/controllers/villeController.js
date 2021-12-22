const db = require("../models");
const Ville = db.ville;

exports.createVille = (req, res) => {
  const ville = new Ville({
    nom: req.body.nom,
    status: "VILLE",
    type: [],
  });

  ville
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

exports.getAllVille = (req, res) => {
  Ville.find({ status: "VILLE" })
    .sort({ nom: 1 })
    .populate("type")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      return res.status(200).send(user);
    });
};

exports.getVille = (req, res) => {
  Ville.findById(req.params.id)
    .populate("type")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      return res.status(200).send(user);
    });
};

exports.createSubVille = (req, res) => {
  const id = req.params.id;
  const ville = new Ville({
    nom: req.body.nom,
    status: "SUBVILLE",
  });

  ville
    .save()
    .then((resultat) => {
      var conditions = {
        _id: id,
        //   type: { $ne: req.userId },
      };

      var update = {
        $addToSet: { type: resultat._id },
      };

      Ville.findOneAndUpdate(conditions, update)
        .populate("type")
        .exec()
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            message: "Oups!! une erreur est survenue",
            error: err,
          });
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
