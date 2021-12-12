const { authJwt } = require("../middlewares");
const controller = require("../controllers/cadeauController");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/cadeau",
    [authJwt.verifyToken, authJwt.isHotesse],
    controller.ajouterCadeau
  );

  app.get(
    "/cadeau",
    [authJwt.verifyToken, authJwt.isHotesse],
    controller.getHotesseCadeau
  );

  app.delete(
    "/cadeau/:id",
    [authJwt.verifyToken, authJwt.isHotesse],
    controller.deleteCadeau
  );

  //   app.put(
  //     "/cadeau/remove",
  //     [authJwt.verifyToken, authJwt.isHotesse],
  //     controller.removePoint
  //   );
};
