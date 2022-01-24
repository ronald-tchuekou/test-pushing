const express = require("express");
var helmet = require("helmet");

const bodyParser = require("body-parser");
// const cors = require("cors");
const db = require("./api/models");
const dbConfig = require("./api/config/db.config");
const { message } = require("./api/models");

const app = express();
const Role = db.role;
const Chat = db.message;

// let server = require("http").Server(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
let server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
let io = require("socket.io")(server, {
  cors: {
    origin: "*",
    method: ["GET", "POST"],
  },
});

// const SibApiV3Sdk = require("sib-api-v3-sdk");
// let defaultClient = SibApiV3Sdk.ApiClient.instance;

// app.set("io", io);

app.use(helmet());
app.disable("x-powered-by");

app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    parameterLimit: 100000,
    extended: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/uploads", express.static("uploads"));

// var corsOptions = {
//   origin: "http://localhost:8080",
// };

// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

db.mongoose
  .connect(
    `${dbConfig.URL}`,
    // `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: false,
    }
  )
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// routes
require("./api/routes/auth.route")(app);
require("./api/routes/prestation.route")(app);
require("./api/routes/prestaCoiffeuse.route")(app);
require("./api/routes/galerie.route")(app);
require("./api/routes/plage.route")(app);
require("./api/routes/ville.route")(app);
require("./api/routes/disponibilite.route")(app);
require("./api/routes/message.route")(app);
require("./api/routes/reservation.route")(app);
require("./api/routes/like.route")(app);
require("./api/routes/coupon.route")(app);
require("./api/routes/avis.route")(app);

// app.post("", (req, res) => {

// });

//// app.use('/auth', authRoute);
// app.use('/user', userRoute);
// app.use('/atelier', atelierRoute);

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        nom: "cliente",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'cliente' to roles collection");
      });

      new Role({
        nom: "coiffeuse",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'coiffeuse' to roles collection");
      });

      new Role({
        nom: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur l'API BiGooDee." });
});

io.on("connection", function (socket) {
  socket.on("get-message", (data) => {
    // {
    //   $or: [
    //     { toId: data.userId, fromId: data.uid },
    //     { toId: data.uid, fromId: data.userId },
    //   ],
    // }
    Chat.find()
      .sort({ createdAt: -1 })
      .populate("toId fromId")
      .exec()
      .then((result) => {
        console.log(result);
        io.emit("getmessage", result);
      });
  });

  console.log("connecter" + socket),
    socket.on("disconnect", function () {
      console.log("user disconnected");
    });

  // socket.on("setUser", function (data) {
  //   console.log(data);
  //   socket.emit("test", data);
  // });

  socket.on("add-message", (message) => {
    const msg = new Chat({
      toId: message.toId,
      fromId: message.fromId,
      message: message.message,
      imageURL: message.imageURL,
    });

    msg.save().then(() => {
      io.emit("message", message);
    });
  });
});
