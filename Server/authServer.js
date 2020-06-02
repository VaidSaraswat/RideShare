const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
const User = require("../Server/models/user.js");
const RefreshToken = require("../Server/models/refreshToken.js");

require("dotenv").config();
//Create router
let router = express.Router();

const URL = process.env.URL;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30min",
  });
}
router.route("/token").post(async (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) {
    res.sendStatus(401);
  } else {
    //Check if the refresh token is currently in the token db
    let exists = await RefreshToken.exists({ token: refreshToken });
    //If not then the refresh token is invalid
    if (!exists) {
      res.sendStatus(403);
    }
    //Generate new access token for the user
    else {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, payload) => {
          if (err) {
            res.send(err);
          } else {
            const accessToken = generateAccessToken({ name: payload.name });
            res.json({ accessToken: accessToken });
          }
        }
      );
    }
  }
});

router.route("/logout").post((req, res) => {
  RefreshToken.findOneAndRemove({ token: req.body.token }, (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send("Refresh token was deleted from the database");
    }
  });
});
router.route("/login").post(async (req, res) => {
  //Authenticate user and if successful then issue json web token
  let user = await User.findOne({ name: req.body.name });
  if (user == null) {
    res.send("Cannot find user!");
  } else {
    try {
      if (await bcrypt.compare(req.body.password, user.password)) {
        let payload = { name: user.name, number: user.number };
        let accessToken = generateAccessToken(payload);
        let refreshToken = new RefreshToken();
        refreshToken.token = jwt.sign(
          payload,
          process.env.REFRESH_TOKEN_SECRET
        );
        refreshToken.save((err) => {
          if (err) {
            console.log(err);
          }
        });
        res.json({ accessToken: accessToken, refreshToken: refreshToken });
      } else {
        res.send("Invalid Password/Username!");
      }
    } catch {
      res.send("Error!");
    }
  }
});
router
  .route("/register")
  //Create user
  .put(async (req, res) => {
    //Check if the username is currently available if so then add to the db, otherwise notify them to use a different username
    let exists = await User.exists({ name: req.body.name });
    if (exists) {
      res.send("Sorry that user name is already taken!");
    }
    //Hash users password and store user into db
    else {
      let user = new User();
      user.name = req.body.name;
      user.number = req.body.number;

      try {
        let hashedPassword = await bcrypt.hash(req.body.password, 10);
        user.password = hashedPassword;

        user.save((err) => {
          if (err) {
            res.send(err);
          } else {
            res.send("Account Created Successfully!");
          }
        });
      } catch {
        res.send("Error, something happend on server side");
      }
    }
  });
//Get controllers
app.use("/api", router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log("Listening on port " + port);
