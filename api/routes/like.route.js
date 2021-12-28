const { verifySignUp, authJwt } = require("../middlewares");
const controller = require("../controllers/likeController");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "*, x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/like",
    [authJwt.verifyToken, authJwt.isCliente],
    controller.create
  );

  app.get(
    "/like",
    [authJwt.verifyToken, authJwt.isCliente],
    controller.getAllLike
  );

  app.get(
    "/like/:coiffeuse",
    [authJwt.verifyToken, authJwt.isCliente],
    controller.getLike
  );

  app.delete(
    "/like/:coiffeuse",
    [authJwt.verifyToken, authJwt.isCliente],
    controller.remove
  );
};
