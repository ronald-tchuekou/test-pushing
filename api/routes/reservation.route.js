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
  app.get(
    "/reservation/coiffeuse",
    [authJwt.verifyToken, authJwt.isCoiffeuse],
    controller.getCoiffeuseReservation
  );

  app.get(
    "/reservation/status/:status",
    [authJwt.verifyToken, authJwt.isCoiffeuse],
    controller.getReservationByStatus
  );
  app.put(
    "/reservation/:id/:status",
    [authJwt.verifyToken, authJwt.isCoiffeuse],
    controller.updateReservationStatus
  );
};
