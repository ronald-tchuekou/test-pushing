const db = require("../models");
const Coupon = db.coupon;

exports.coupons_create_coupon = (req, res, next) => {
  const couponCode = coupongenerator();
  const newCoupon = new Coupon({
    code: couponCode,
    isPercent: req.body.isPercent,
    amount: req.body.amount,
    expireDate: req.body.expireDate,
    remeningNumber: req.body.remeningNumber,
    isActive: req.body.isActive,
  });

  if (newCoupon.isPercent == true && newCoupon.amount > 100) {
    return res
      .status(400)
      .send({ message: "La valeur doit etre moins de 100" });
  }

  newCoupon
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.getCouponByCode = (req, res) => {
  Coupon.findOne({ code: req.params.code })
    .exec()
    .then((coupon) => {
      if (coupon) {
        const currentDate = new Date();
        if (
          coupon.remeningNumber <= 0 ||
          Date.parse(coupon.expireDate) < currentDate
        ) {
          return res.status(404).json({ message: "Coupon inactif" });
        }
        res.status(200).json(coupon);
        console.log(coupon);
      } else {
        return res.status(404).json({ message: "Coupon invalide" });
      }
    });
};

function coupongenerator() {
  var coupon = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (var i = 0; i < 6; i++) {
    coupon += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  for (var i = 0; test(coupon); i++) return coupon;
}

function test(coupon) {
  return Coupon.findOne({ code: coupon });
}
