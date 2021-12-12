const db = require("../models");
const Cadeau = db.cadeau;

exports.Hello_Word = (req, res) => {
  res.send("Hello Point");
};

exports.ajouterCadeau = (req, res) => {
  Cadeau.find({ $and: [{ produit: req.body.produit }, { status: "AWAIT" }] })
    .exec()
    .then((result) => {
      if (result.length == 0) {
        let cadeau = new Cadeau({
          produit: req.body.produit,
          hotesse: req.userId,
        });
        cadeau.save().then((resp) => {
          res.status(201).json(resp);
        });
      } else {
        Cadeau.findOneAndUpdate(
          { $and: [{ _id: result[0]._id }, { hotesse: req.userId }] },
          { $inc: { qte: 1 } },
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

exports.getHotesseCadeau = (req, res) => {
  Cadeau.find({ $and: [{ hotesse: req.userId }, { status: "AWAIT" }] })
    .populate("produit")
    .exec()
    .then((result) => {
      res.status(200).json(result);
    });
};

exports.deleteCadeau = (req, res) => {
  const id = req.params.id;
  Cadeau.findById(id)
    .exec()
    .then((result) => {
      if (result.hotesse == req.userId) {
        Cadeau.deleteOne({ _id: id })
          .exec()
          .then((ress) => {
            res.status(200).json(ress);
          });
      }
    });
};

// dans atelier faire lafonction suivante
