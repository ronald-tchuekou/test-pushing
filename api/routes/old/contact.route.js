const { authJwt } = require("../middlewares");
const controller = require("../controllers/contactController");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/contact", controller.addContact);

  app.get(
    "/contact",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.get_contact
  );

  app.delete(
    "/contact/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.delete_contact
  );
};
