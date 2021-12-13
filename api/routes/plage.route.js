const controller = require("../controllers/plageController");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/plage",
    //   [authJwt.verifyToken],
    controller.create
  );

  app.get("/plage", controller.getAllPlage);
  app.get("/plage/:id", controller.getPlage);

  app.delete("/plage/:id", controller.deletePlage);
};
