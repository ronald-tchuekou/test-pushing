const db = require("../models");
const Prestation = db.prestation;

exports.createPrestation = (req, res) => {
  const prestation = new Prestation({
    prestation: req.body.prestation,
    status: "PRESTATION",
    index: req.body.index,
    imageURL: req.body.imageURL,
    type: [],
  });

  prestation
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

exports.getAllPrestation = (req, res) => {
  Prestation.find({ status: "PRESTATION" })
    .sort({ index: 1 })
    .populate("type")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      return res.status(200).send(user);
    });
};

exports.createPrestationType = (req, res) => {
  const id = req.params.id;
  const prestation = new Prestation({
    prestation: req.body.prestation,
    imageURL: req.body.imageURL,
    index: req.body.index,

    status: "TYPE",
  });

  prestation
    .save()
    .then((resultat) => {
      var conditions = {
        _id: id,
        //   type: { $ne: req.userId },
      };

      var update = {
        $addToSet: { type: resultat._id },
      };

      Prestation.findOneAndUpdate(conditions, update)
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

// exports.inscriptionAtelier = (req, res) => {
//   const id = req.params.id;
//   var conditions = {
//     _id: id,
//     participant: { $ne: req.userId },
//   };

//   var update = {
//     $addToSet: { participant: req.userId },
//   };

//   Prestation.findOneAndUpdate(conditions, update)
//     .exec()
//     .then((result) => {
//       res.status(200).json(result);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         message: "Oups!! une erreur est survenue",
//         error: err,
//       });
//     });
// };

// exports.desinscriptionAtelier = (req, res) => {
//   const id = req.params.id;
//   Atelier.updateOne({ _id: id }, { $pull: { participant: req.userId } })
//     .exec()
//     .then((resultat) => {
//       res.status(200).json(resultat);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         message: "Oups!! une erreur est survenue",
//         error: err,
//       });
//     });
// };
