const db = require("../models");
const Ville = db.ville;
const nodeMailer = require("nodemailer");
const smtpTransport = nodeMailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: {
    user: "lgmickala.pro@gmail.com",
    pass: "0WJn9QgTR5pwYM7L",
  },
});
const toMail = "noukimi.patrick@gmail.com";
const fromMail = "";

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

exports.villeSuggestion = async (req, res) => {
  const ville = req.body.ville;
  try {
    let send = await smtpTransport.sendMail({
      from: "BiGooDee <lgmickala.pro@gmail.com",
      to: toMail,
      subject: "Suggestion de ville",
      text: `${ville} a été suggéré comme ville`,
      // html: `<div style="color:red; font-size: 48px;">je suis un html hyper Cool</div>`,
    });
    console.log(send);
    return res.status(250).json({ message: `${ville} a bien été suggéré.` });
  } catch (error) {
    return res.status(500).json({ message: "Oups une erreur c'est produite" });
  }
};

exports.conctact = async (req, res) => {
  const objet = req.body.objet;
  const message = req.body.message;
  const prenom = req.body.prenom;
  const email = req.body.email;

  try {
    let send = await smtpTransport.sendMail({
      from: `${prenom} <lgmickala.pro@gmail.com`,
      to: toMail,
      subject: objet,
      text: message,
    });
    console.log(send);
    return res.status(250).json({ message: `Votre message a été envoyé` });
  } catch (error) {
    return res.status(500).json({ message: "Oups une erreur c'est produite" });
  }
};
