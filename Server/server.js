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
const api_key = process.env.API_KEY;

mongoose.connect(`mongodb+srv://Vaid:${api_key}@cluster0-u4itf.mongodb.net/test?retryWrites=true&w=majority`, 
{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let router = express.Router();

app.use('/api', router);
app.use('', userController);
app.use('', rideController);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Listening on port ' + port);