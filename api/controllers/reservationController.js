const db = require("../models");
const stripe = require("stripe")("sk_test_djG6iLVDmEakcUZ6H6enmHHz00EI0Z9ufX");
const Reservation = db.reservation;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.createReservation = (req, res) => {
  let data = {
    amount: 0,
    currency: "EUR",
    source: req.body.token,
    description: `Frais demandés par la coiffeuse ${req.body.data.prestation.uid.prenom} pour des ${req.body.data.prestation.prestation.prestation}`,
  };
  if (req.body.data.reduction === null) {
    data.amount = req.body.data.prestation.tarif * 100;
  } else {
    data.amount =
      (req.body.data.prestation.tarif -
        (req.body.data.reduction.amount * req.body.data.prestation.tarif) /
          100) *
      100;
  }
  // console.log(data);

  stripe.charges
    .create(data)
    .then((charge) => {
      console.log(req.body);
      const reservation = new Reservation({
        cliente: req.userId,
        coiffeuse: req.body.data.prestation.uid._id,
        prestation: req.body.data.prestation._id,
        disponibilite: req.body.data.plage._id,
        date: req.body.data.date,
        reduction: req.body.data.reduction._id,
      });
      reservation
        .save()
        .then((reserve) => {
          console.log(reserve);
          return res.status(200).json(charge);
        })
        .catch((err) => {
          console.log("add\n" + err);
          res.send(err);
        });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
  return;
};
