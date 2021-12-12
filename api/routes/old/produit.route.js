const { authJwt } = require("../middlewares");
const controller = require("../controllers/produitController");
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
    "/produit",
    [authJwt.verifyToken, authJwt.isAdmin],
    upload.single("imageURL"),
    controller.createProduct
  );

  app.get(
    "/produit",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.get_all_product
  );

  app.delete(
    "/produit/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.delete_product
  );
};
