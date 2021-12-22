const { verifySignUp, authJwt } = require("../middlewares");
const controller = require("../controllers/prestaCoiffeuseController");
// const upload = require("../utils/upload");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/coiffeuse/prestation", [authJwt.verifyToken], controller.create);

  app.get(
    "/coiffeuse/prestation",
    [authJwt.verifyToken],
    controller.getCoiffeusePresta
  );
  app.get("/coiffeuse/prestation/:id", controller.getCoiffeusePresta);

  app.get("/search/prest", controller.search);

  app.get("/search/coiffeuse/prestation", controller.getSearchCoiffeusePresta);

  app.delete(
    "/coiffeuse/prestation/:id",
    [authJwt.verifyToken],
    controller.deleteCoiffeusePresta
  );

  //   app.get("/auth/profile", [authJwt.verifyToken], controller.getCurrentUser);
};
