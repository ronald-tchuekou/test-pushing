const { verifySignUp, authJwt } = require("../middlewares");
const controller = require("../controllers/disponibiliteController");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/planning",
    [authJwt.verifyToken, authJwt.isCoiffeuse],
    controller.create
  );

  app.get("/planning", controller.getAllDisponibilite);

  app.get("/planning", controller.getDisponibilite);

  //   app.get("/auth/profile", [authJwt.verifyToken], controller.getCurrentUser);
};
