const { authJwt } = require("../middlewares");
const controller = require("../controllers/cataloguecontroller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/catalogue",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.addProduct
  );

  app.get("/catalogue", [authJwt.verifyToken], controller.get_catalogue);

  app.delete(
    "/catalogue/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.delete_catalogue
  );
};
