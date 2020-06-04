const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = 3001;
const cors = require("cors");
const userController = require("../Server/controllers/userController.js");
const rideController = require("../Server/controllers/rideController.js");
const ratingController = require("../Server/controllers/ratingController.js");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
require("dotenv").config();
const URL = process.env.URL;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

//Create router
let router = express.Router();

//Get controllers
app.use("/api", router);
app.use("", userController);
app.use("", rideController);
app.use("", ratingController);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log("Listening on port " + port);
