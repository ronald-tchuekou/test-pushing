const { verifySignUp, authJwt } = require("../middlewares");
const controller = require("../controllers/authController");
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
    "/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );

  app.get("/auth/profile", [authJwt.verifyToken], controller.getCurrentUser);
  app.put("/auth/update", [authJwt.verifyToken], controller.updateUser);
  app.put("/auth/updatepass", [authJwt.verifyToken], controller.changePassword);
  app.get("/auth/coiffeuse", controller.getCoiffeuse);
  app.get("/users/coiffeuses", controller.getAllCoiffeuse);
  app.put(
    "/auth/updateimage",
    [authJwt.verifyToken],
    controller.updateUserImage
  );
  app.post("/auth/signin", controller.signin);

  app.get("/auth/users", [authJwt.verifyToken], controller.getAllUser);
  app.get("/auth/user/:id", [authJwt.verifyToken], controller.getUserById);

  app.get(
    "/admin/users/coiffeuses",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAwaitCoiffeuse
  );
  app.get(
    "/add/users/clientes",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllCliente
  );

  app.put(
    "/admin/user/updatestatus/:uid",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateStatus
  );
};
