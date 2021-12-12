const { authJwt } = require("../middlewares");
const controller = require("../controllers/atelierController");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/atelier",
    [authJwt.verifyToken, authJwt.isConseillere],
    controller.createAtelier
  );

  app.get(
    "/atelier/conseillere",
    [authJwt.verifyToken, authJwt.isConseillere],
    controller.getConseillereAtelier
  );

  app.get("/atelier", controller.getAllAvalableAtelier);

  app.put(
    "/atelier/inscription/:id",
    [authJwt.verifyToken],
    controller.inscriptionAtelier
  );

  app.put(
    "/atelier/desinscription/:id",
    [authJwt.verifyToken],
    controller.desinscriptionAtelier
  );

  app.get(
    "/atelier/hotesse",
    [authJwt.verifyToken],
    controller.getAllHotesseAtelier
  );

  app.get("/atelier/ville", controller.getAllVilleAtelier);
};
