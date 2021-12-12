const { authJwt } = require("../middlewares");
const controller = require("../controllers/pointController");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/point",
    [authJwt.verifyToken, authJwt.isHotesse],
    controller.getPoints
  );

  app.put(
    "/point/add",
    [authJwt.verifyToken, authJwt.isHotesse],
    controller.addPoint
  );

  app.put(
    "/point/remove",
    [authJwt.verifyToken, authJwt.isHotesse],
    controller.removePoint
  );
};
