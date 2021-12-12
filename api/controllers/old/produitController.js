const db = require("../models");
const Produit = db.produit;

exports.Hello_Word = (req, res) => {
  res.send("Hello Atelier");
};

exports.get_all_product = (req, res) => {
  let query = "";
  if (req.query.nom) query = req.query.nom;
  Produit.find({ nom: { $regex: query, $options: "$i" } })
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

exports.createProduct = (req, res) => {
  var imageURL = "default.jpg";
  if (req.file) imageURL = req.file.path;
  console.log(imageURL);
  let produit = new Produit({
    nom: req.body.nom,
    imageURL: imageURL,
    description: req.body.description,
    prix: req.body.prix,
    unite: req.body.unite,
    capacite: req.body.capacite,
    categorie: req.body.categorie,
  });

  produit
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

exports.delete_product = (req, res) => {
  const id = req.params.id;

  if (id.length != 24) {
    return res.status(400).send("Identifiant invalide");
  }
  Produit.remove({ _id: id })
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
