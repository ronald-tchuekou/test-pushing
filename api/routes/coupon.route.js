const { verifySignUp, authJwt } = require("../middlewares");
const controller = require("../controllers/couponController");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "*, x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/coupon", controller.coupons_create_coupon);
  app.get("/coupon/:code", controller.getCouponByCode);
};
