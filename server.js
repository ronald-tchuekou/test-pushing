const express = require("express");
var helmet = require("helmet");

const bodyParser = require("body-parser");
// const cors = require("cors");
const db = require("./api/models");
const dbConfig = require("./api/config/db.config");

const app = express();
const Role = db.role;

let server = require("http").Server(app);
let io = require("socket.io")(server);

const SibApiV3Sdk = require("sib-api-v3-sdk");
let defaultClient = SibApiV3Sdk.ApiClient.instance;

// app.set("io", io);

io.on("connection", function (socket) {
  console.log("connecter" + socket),
    socket.on("setUser", function (data) {
      console.log(data);
      socket.emit("test", data);
    });
});

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
// require("./api/routes/profilBeaute.route")(app);

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

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// // # ------------------
// // # Create a campaign\
// // # ------------------
// // # Include the Sendinblue library\
// var SibApiV3Sdk = require('sib-api-v3-sdk');
// var defaultClient = SibApiV3Sdk.ApiClient.instance;
// // # Instantiate the client\
// var apiKey = defaultClient.authentications['api-key'];
// apiKey.apiKey = 'YOUR_API_V3_KEY';
// var apiInstance = new SibApiV3Sdk.EmailCampaignsApi();
// var emailCampaigns = new SibApiV3Sdk.CreateEmailCampaign();
// // # Define the campaign settings\
// emailCampaigns.name = "Campaign sent via the API";
// emailCampaigns.subject = "My subject";
// emailCampaigns.sender = {"name": "From name", "email":"lgmickala.pro@gmail.com"};
// emailCampaigns.type = "classic";
// // # Content that will be sent\
// emailCampaigns.recipients = {}
// htmlContent: 'Congratulations! You successfully sent this example campaign via the Sendinblue API.',
// // # Select the recipients\
// recipients: {listIds: [2, 7]},
// // # Schedule the sending in one hour\
//  scheduledAt: '2018-01-01 00:00:01'
// }
// // # Make the call to the client\
// apiInstance.createEmailCampaign(emailCampaigns).then(function(data) {
// console.log('API called successfully. Returned data: ' + data);
// }, function(error) {
// console.error(error);
// });

// let apiKey =
//   defaultClient.authentications[
//     "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"
//   ];
// apiKey.apiKey = process.env.SMTP_KEY;

// let apiInstance = new SibApiV3Sdk.EmailCampaignsApi();

// let campaignId = 1;

// let emailTo = new SibApiV3Sdk.SendTestEmail();

// emailTo = {
//   emailTo: ["noukimi.patrick@gmail.com"],
// };

// apiInstance.sendTestEmail(campaignId, emailTo).then(
//   function () {
//     console.log("API called successfully.");
//   },
//   function (error) {
//     console.error(error);
//   }
// );
