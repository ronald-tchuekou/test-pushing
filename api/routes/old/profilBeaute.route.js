const { authJwt } = require("../middlewares");
const controller = require("../controllers/profilBeauteController");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/profilBeaute", [authJwt.verifyToken], controller.addProfil);
  app.get("/profilBeaute", [authJwt.verifyToken], controller.getProfil);
};
