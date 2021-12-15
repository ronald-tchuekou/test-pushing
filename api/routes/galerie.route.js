const { verifySignUp, authJwt } = require("../middlewares");
const controller = require("../controllers/galerieController");
const upload = require("../utils/upload");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/coiffeuse/galerie",
    [authJwt.verifyToken, authJwt.isCoiffeuse],
    controller.create
  );

  app.get("/coiffeuse/galerie", [authJwt.verifyToken], controller.getGalerie);
  //   app.get(
  //     "/coiffeuse/galerie/:uid",
  //     [authJwt.verifyToken],
  //     controller.getCoiffeusePresta
  //   );
  app.delete(
    "/coiffeuse/galerie/:id",
    [authJwt.verifyToken],
    controller.deleteGalerie
  );
};
