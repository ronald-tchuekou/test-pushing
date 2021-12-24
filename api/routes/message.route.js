const controller = require("../controllers/messageController");
const { verifySignUp, authJwt } = require("../middlewares");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/chat", [authJwt.verifyToken], controller.sendMessage);

  app.get("/chat/discussion", [authJwt.verifyToken], controller.getDiscussion);
  //   app.get("/plage/:id", controller.getPlage);

  //   app.delete("/plage/:id", controller.deletePlage);
};
