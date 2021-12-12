const { verifySignUp, authJwt } = require("../middlewares");
const controller = require("../controllers/prestationController");
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
    "/prestation",
    upload.single("imageURL"),
    controller.createPrestation
  );

  app.post(
    "/prestation/:id",
    upload.single("imageURL"),
    controller.createPrestationType
  );

  app.get("/prestation", controller.getAllPrestation);

  //   app.get("/auth/profile", [authJwt.verifyToken], controller.getCurrentUser);
};
