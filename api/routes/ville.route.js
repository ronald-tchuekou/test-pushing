const { verifySignUp, authJwt } = require("../middlewares");
const controller = require("../controllers/villeController");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/ville", controller.createVille);

  app.post("/ville/:id", controller.createSubVille);

  app.get("/ville", controller.getAllVille);
  app.get("/ville/:id", controller.getVille);
  app.post("/villes/suggestion", controller.villeSuggestion);
  app.post("/contact", [authJwt.verifyToken], controller.conctact);

  //   app.get("/auth/profile", [authJwt.verifyToken], controller.getCurrentUser);
};
