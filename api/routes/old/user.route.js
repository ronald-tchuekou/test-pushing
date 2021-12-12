const { authJwt } = require("../middlewares");
const controller = require("../controllers/userControllers");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/all", controller.allAccess);

  app.get("/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/mod",
    [authJwt.verifyToken, authJwt.isConseillere],
    controller.moderatorBoard
  );

  app.get(
    "/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.get(
    "/user/:uid",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getUserById
  );

  app.get(
    "/unvalid",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.unvalidateConseiller
  );
  app.put(
    "/user/:uid",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.validate
  );

  app.get(
    "/users/:type",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getTypeOfUsers
  );
};
