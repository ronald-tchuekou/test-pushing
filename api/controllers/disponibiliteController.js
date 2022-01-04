const db = require("../models");
const Disponibilite = db.disponibilite;
const CoifPresta = db.prestaCoiffeuse;
const mongoose = require("mongoose");

exports.create = (req, res) => {
  const disponibilite = new Disponibilite({
    uid: req.userId,
    date: req.body.date,
    plage: req.body.plage,
  });

  disponibilite
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

exports.getAllDisponibilite = (req, res) => {
  const date = req.query.date;
  const plage = req.query.plage;
  Disponibilite.find({
    $and: [{ date: date }, { plage: plage }],
  })
    .populate("uid plage")
    .exec()
    .then((resultats) => res.status(200).json(resultats))
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Oups!! une erreur est survenue",
        error: err,
      });
    });
};

exports.getCoiffeuseDisponibilite = (req, res) => {
  const date = req.query.date;
  Disponibilite.find({
    $and: [{ date: date }, { uid: req.userId }],
  })
    .populate({ path: "plage", options: { sort: { index: -1 } } })
    .exec()
    .then((resultats) => res.status(200).json(resultats))
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Oups!! une erreur est survenue",
        error: err,
      });
    });
};

exports.getCoiffeuseDisponibiliteByUid = (req, res) => {
  const date = req.params.date;
  const uid = req.params.id;
  Disponibilite.find({
    $and: [{ date: date }, { uid: uid }],
  })
    .populate({ path: "plage", options: { sort: { index: -1 } } })
    .exec()
    .then((resultats) => res.status(200).json(resultats))
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Oups!! une erreur est survenue",
        error: err,
      });
    });
};

exports.getCoiffeuseAllDisponibiliteDate = (req, res) => {
  const uid = req.params.id;
  Disponibilite.find({ uid: uid })
    .distinct("date")
    .populate({ path: "plage", options: { sort: { index: -1 } } })
    .exec()
    .then((resultats) => res.status(200).json(resultats))
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Oups!! une erreur est survenue",
        error: err,
      });
    });
};

exports.getDisponibilite = (req, res) => {
  const id = req.params.id;
  Disponibilite.findById(id)
    .exec()
    .then((resultats) => res.status(200).json(resultats))
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Oups!! une erreur est survenue",
        error: err,
      });
    });
};

exports.deleteDisponibilite = (req, res) => {
  const date = req.query.date;
  Disponibilite.remove({
    $and: [{ date: date }, { uid: req.userId }],
  })
    .exec()
    .then((resultats) => res.status(200).json(resultats))
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Oups!! une erreur est survenue",
        error: err,
      });
    });
};

exports.search = (req, res) => {
  const date = req.query.date;
  const plage = req.query.plage;
  Disponibilite.find({
    $and: [{ date: date }, { plage: plage }],
  })
    .populate("plage")
    .exec()
    .then((resultats) => res.status(200).json(resultats))
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Oups!! une erreur est survenue",
        error: err,
      });
    });
};

exports.searchResult = (req, res) => {
  let date, plage, presta, ville;
  let search = [];
  let dispo = [];
  try {
    date = req.params.date;
    plage = mongoose.Types.ObjectId(req.params.plage);
    presta = mongoose.Types.ObjectId(req.params.presta);
    ville = mongoose.Types.ObjectId(req.params.ville);
  } catch (error) {
    return res.status(400).json({ message: "Bad request" });
  }
  // console.log(date);
  // console.log(plage);

  Disponibilite.find({ date: date, plage: plage })
    .select("uid")
    .exec()
    .then((result) => {
      dispo = result;
      // console.log(result);
      if (result.length === 0) {
        return res.status(404).json(result);
      } else {
        for (var i = 0; i < result.length; i++) {
          var j = 0;
          console.log(result.length);
          CoifPresta.find({ uid: result[i].uid, prestation: presta })
            .populate("uid prestation")
            .exec()
            .then((ress) => {
              for (j = 0; j < ress.length; j++) {
                // console.log(j);
                search.push(ress[j]);
                if (j === ress.length - 1 && i === result.length) {
                  res.status(200).json(search);
                }
              }
            });
        }
        // res.status(200).json(search);
      }
    });

  console.log(dispo);
};

exports.searchResults = async (req, res) => {
  let date, plage, presta, ville;
  let search = [];
  let dispo = [];
  try {
    date = req.params.date;
    plage = mongoose.Types.ObjectId(req.params.plage);
    presta = mongoose.Types.ObjectId(req.params.presta);
    ville = mongoose.Types.ObjectId(req.params.ville);
  } catch (error) {
    return res.status(400).json({ message: "Bad request" });
  }
  // console.log(date);
  // console.log(plage);
  const result = await Disponibilite.find({ date: date, plage: plage }).select(
    "uid"
  );
  // console.log(result);
  if (result.length === 0) {
    return res.status(404).json(result);
  }
  await result.forEach(async (element, i) => {
    console.log(i);
    console.log(result.length - 1);
    const ress = await CoifPresta.find({
      uid: element.uid,
      prestation: presta,
    }).populate("uid prestation");
    search.push(ress[0]);
    console.log(ress[0]);
    if (i === result.length - 1) {
      // console.log("cool" + search + "end cool");
      // return res.status(200).json(search);
    }
    // console.log(search);
  });

  return res.json();
  //  Disponibilite.find({ date: date, plage: plage })
  //     .select("uid")
  //     .exec()
  //     .then((result) => {
  //       dispo = result;
  //       // console.log(result);
  //       if (result.length === 0) {
  //         return res.status(404).json(result);
  //       } else {
  //         for (var i = 0; i < result.length; i++) {
  //           var j = 0;
  //           console.log(result.length);
  //           CoifPresta.find({ uid: result[i].uid, prestation: presta })
  //             .populate("uid prestation")
  //             .exec()
  //             .then((ress) => {
  //               for (j = 0; j < ress.length; j++) {
  //                 // console.log(j);
  //                 search.push(ress[j]);
  //                 if (j === ress.length - 1 && i === result.length) {
  //                   res.status(200).json(search);
  //                 }
  //               }
  //             });
  //         }
  //         // res.status(200).json(search);
  //       }
  //     });

  //   console.log(dispo);
};
