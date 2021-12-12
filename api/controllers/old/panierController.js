const { user } = require("../models");
const db = require("../models");
const Panier = db.panier;

// exports.addpanier = (req, res) => {
//   console.log(req.userId);
//   let panier = new Panier({
//     client: req.userId,
//     produit: req.body.produitId,
//     qte: req.body.quantite,
//   });

//   panier
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

exports.addpanier = (req, res) => {
  Panier.find({ $and: [{ produit: req.body.produit }, { status: "AWAIT" }] })
    .exec()
    .then((result) => {
      if (result.length == 0) {
        let panier = new Panier({
          client: req.userId,
          produit: req.body.produitId,
          qte: req.body.quantite,
        });
        panier.save().then((resp) => {
          res.status(201).json(resp);
        });
      } else {
        Panier.findOneAndUpdate(
          { $and: [{ _id: result[0]._id }, { client: req.userId }] },
          { $inc: { qte: req.body.quantite } },
          { new: true }
        )
          .exec()
          .then((resultat) => {
            res.status(200).json(resultat);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      }
    });
};

exports.get_panier = (req, res) => {
  Panier.find({ client: req.userId })
    .populate("produit")
    .exec()
    .then((resultat) => {
      return res.status(200).json(resultat);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Une erreur est survenue",
        err: err,
      });
    });
};

exports.delete_product = (req, res) => {
  const id = req.params.id;

  if (id.length != 24) {
    return res.status(400).send("Identifiant invalide");
  }
  Panier.deleteOne({ _id: id })
    .exec()
    .then((resultat) => {
      res.status(200).json({
        message: "Suppression réussie",
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
