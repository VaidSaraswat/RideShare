const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = 3000;
const userController = require('../Server/controllers/userController.js');
const rideController = require('../Server/controllers/rideController.js');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
require('dotenv').config();
const URL = process.env.URL;

mongoose.connect(URL, 
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

//Create router
let router = express.Router();

//Get controllers
app.use('/api', router);
app.use('', userController);
app.use('', rideController);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Listening on port ' + port);