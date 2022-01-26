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
  // admin

  app.put(
    "/admin/refuse/reservation/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.cancelReservation
  );
  app.get(
    "/admin/reservation/status",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminGetReservationStatus
  );

  app.get(
    "/admin/reservation",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminGetReservation
  );
  app.get(
    "/admin/reservation/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminGetReservationById
  );

  app.get(
    "/admin/reservation/coiffeuse/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminGetReservationCoiffeuse
  );

  app.put(
    "/admin/reservation/change/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateReservationCoiffeuse
  );

  app.get(
    "/admin/cliente/reservation",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllClienteReserve
  );
};
