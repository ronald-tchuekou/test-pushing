const db = require("../models");
const Atelier = db.atelier;

exports.getAllAtelier = (req, res) => {
  Atelier.find()
    .populate("hotesse conseillere")
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

exports.getAtelierById = (req, res) => {
  Atelier.findById(req.params.id)
    .populate("hotesse conseillere participant")
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

exports.getAllAvalableAtelier = (req, res) => {
  Atelier.find({
    date: {
      $gte: new Date(Date.now()),
    },
  })
    .populate({
      path: "hotesse conseillere participant",
      match: { hotesse: !null },
      select: "_id nom prenom email adresse ville postal status numero",
    })
    .exec()
    .then((resultats) => {
      console.log(resultats);

      res.status(200).json({
        count: resultats.length,
        data: resultats,
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

exports.deleteAtelier = (req, res) => {
  const id = req.params.id;
  Atelier.delete({ _id: id })
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
};

exports.createAtelier = (req, res) => {
  let atelier = new Atelier({
    conseillere: req.userId,
    hotesse: req.body.hotesse,
    adresse: req.body.adresse,
    ville: req.body.ville,
    status: req.body.status,
    place: req.body.place,
    placeTotale: req.body.placeTotale,
    theme: req.body.theme,
    heure: req.body.heure,
    description: req.body.description,
    date: req.body.date,
  });

  atelier
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

exports.getConseillereAtelier = (req, res) => {
  Atelier.find({ conseillere: req.userId })
    .populate({
      path: "hotesse conseillere",
      match: { hotesse: !null },
      select: "_id nom prenom email adresse ville postal status numero",
    })

    // "hotesse", null, { hotesse: !null })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      return res.status(200).send(user);
    });
};

exports.getAllHotesseAtelier = (req, res) => {
  Atelier.find({ hotesse: req.userId })
    .populate({
      path: "hotesse conseillere",
      match: { hotesse: !null },
      select: "_id nom prenom email adresse ville postal status numero",
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

exports.getAllVilleAtelier = (req, res) => {
  let query = "";
  if (req.query.ville) query = req.query.ville;
  Atelier.find({
    $and: [
      { ville: { $regex: query, $options: "$i" } },
      {
        date: {
          $gte: new Date(Date.now()),
        },
      },
    ],
  })
    .populate({
      path: "hotesse conseillere",
      select: "_id nom prenom email adresse ville postal status numero",
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

exports.getAllAtelierByStatus = (req, res) => {
  let query = "";
  if (req.query.status) query = req.query.status;
  Atelier.find({ status: { $regex: query, $options: "$i" } })
    .populate({
      path: "hotesse conseillere",
      select: "_id nom prenom email adresse ville postal status numero",
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

//! TABLE ASSOCIAS

exports.inscriptionAtelier = (req, res) => {
  const id = req.params.id;
  var conditions = {
    _id: id,
    participant: { $ne: req.userId },
  };

  var update = {
    $addToSet: { participant: req.userId },
  };

  Atelier.findOneAndUpdate(conditions, update)
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
};

exports.desinscriptionAtelier = (req, res) => {
  const id = req.params.id;
  Atelier.updateOne({ _id: id }, { $pull: { participant: req.userId } })
    .exec()
    .then((resultat) => {
      res.status(200).json(resultat);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Oups!! une erreur est survenue",
        error: err,
      });
    });
};

exports.addUserAtelier = (req, res) => {
  const id = req.params.id;
  var conditions = {
    _id: id,
    participant: { $ne: req.body.userId },
  };

  var update = {
    $addToSet: { participant: req.body.userId },
  };

  Atelier.findOneAndUpdate(conditions, update)
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
};

exports.removeUserAtelier = (req, res) => {
  const id = req.params.id;
  Atelier.updateOne({ _id: id }, { $pull: { participant: req.body.userId } })
    .exec()
    .then((resultat) => {
      res.status(200).json(resultat);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Oups!! une erreur est survenue",
        error: err,
      });
    });
};
