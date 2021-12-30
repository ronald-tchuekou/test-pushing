const { verifySignUp, authJwt } = require("../middlewares");
const controller = require("../controllers/reservationController");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/stripe/charge",
    [authJwt.verifyToken],
    controller.createReservation
  );

  app.get("/reservation", [authJwt.verifyToken], controller.getReservation);
};
