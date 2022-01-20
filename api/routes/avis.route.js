const { verifySignUp, authJwt } = require("../middlewares");
const controller = require("../controllers/avisController");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "*, x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/avis",
    [authJwt.verifyToken, authJwt.isCliente],
    controller.createAvis
  );
  app.get(
    "/avis/status",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllAwiatAvis
  );
  app.get("/avis/:cid", controller.getAllCoiffeuseAvis);
  app.get(
    "/avis",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllAvis
  );
  app.delete(
    "/avis/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteAvis
  );
  app.put(
    "/avis/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.publishAvis
  );
};
