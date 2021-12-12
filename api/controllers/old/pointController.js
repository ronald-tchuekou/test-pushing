const db = require("../models");
const Point = db.point;

exports.Hello_Word = (req, res) => {
  res.send("Hello Point");
};

exports.getPoints = (req, res) => {
  const uid = req.userId;
  Point.find({ hotesse: uid })
    // .populate({
    //   path: "hotesse",
    //   select:
    //     "_id nom prenom email adresse imageURL ville postal status numero role createdAt updatedAt",
    // })
    .exec()
    .then((resp) => {
      console.log(resp);
      if (resp.length == 0) {
        const point = new Point({
          hotesse: req.userId,
        });
        point
          .save()
          .then((response) => {
            console.log("point succès");
            return res.status(201).json(response);
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      } else {
        res.status(200).json(resp);
      }
    });
};

exports.addPoint = (req, res) => {
  const pointData = parseInt(req.body.point);

  if (pointData <= 0) {
    return res.status(400).json({ message: "Mauvaise requete" });
  }

  Point.findOneAndUpdate(
    { hotesse: req.userId },
    { $inc: { nombre: pointData } },
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
};

exports.removePoint = (req, res) => {
  // const pointData = parseInt(req.body.point);

  // if (pointData <= 0) {
  //   return res.status(400).json({ message: "Mauvaise requete" });
  // }

  // Point.find({ hostesse: req.userId })
  //   .exec()
  //   .then((resultat) => {
  //     if (resultat.length == 0) {
  //       const point = new Point({
  //         hotesse: req.userId,
  //       });
  //       point
  //         .save()
  //         .then((response) => {
  //           console.log("point succès");
  //           return res.status(404).json({ message: "Vous n'avez aucun point" });
  //         })
  //         .catch((err) => {
  //           res.status(500).json(err);
  //         });
  //     }
  //   });

  const pointData = parseInt(req.body.point);

  if (pointData <= 0) {
    return res.status(400).json({ message: "Mauvaise requete" });
  }

  Point.findOneAndUpdate(
    { hotesse: req.userId },
    { $inc: { nombre: -1 * pointData } },
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

  // Point.findOneAndUpdate(
  //   { hostesse: req.userId },
  //   { $inc: { nombre: -1 * pointData } },
  //   { new: true }
  // )
  //   .exec()
  //   .then((resultat) => {
  //     res.status(200).json(resultat);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json(err);
  //   });
};
