const db = require("../models");
const Chat = db.message;
const io = require("socket.io")(3000);

exports.sendMessage = (req, res) => {
  // const io = req.app.get("io");
  const message = new Chat({
    toId: req.body.toId,
    fromId: req.userId,
    message: req.body.message,
    imageURL: req.body.imageURL,
  });

  message
    .save()
    .then((resultat) => {
      // res.status(201).json(resultat);
      // io.on("connection", (socket) => {
      //   socket.emit("sendMessage");
      // });
      // io.emit("");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Oups!! une erreur est survenue",
        error: err,
      });
    });
};

exports.getChat = (req, res) => {
  uid = req.params.uid;
  Chat.find({
    $or: [
      { toId: req.userId, fromId: uid },
      { toId: uid, fromId: req.userId },
    ],
  })
    .populate("toId fromId")
    .exec()
    .then((resultats) => res.status(200).json(resultats))
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Oups!! une erreur est survenue",
        error: err,
      });
    });
};

exports.getDiscussion = (req, res) => {
  Chat.find({
    $or: [{ toId: req.userId }, { fromId: req.userId }],
  })
    .populate("toId fromId")
    .exec()
    .then((resultats) => res.status(200).json(resultats))
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Oups!! une erreur est survenue",
        error: err,
      });
    });
};
