const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Rating = require('../models/rating.js');

function authenticateToken(req, res, next){
  const authHeader = req.headers['authorization']; //Get the authorization header
  const token = authHeader && authHeader.split(' ')[1]; //Token is going to be either undefined or the correct token
  req.payload = null; //Set the payload to null
  if(token == null){
    res.send('No token received!');
  }

  else{
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload)=>{
      if(err){
        res.send('Token No Longer Valid');
      }
      else{
        console.log('Token is valid!');
        req.payload = payload;
      }
    });
    next();
  }
  
}
router.route('/api/addRating')
  .post(authenticateToken, (req, res)=>{
    let rating = new Rating();
    rating.driver = req.body.driver;
    rating.rating = parseInt(req.body.rating);

    rating.save((err)=>{
      if(err){
        res.send(err);
      }

      else{
        res.send('Rating was successfully saved');
      }
    });
  });

router.route('/api/ratings')
  .get( authenticateToken, (req, res)=>{
    Rating.find((err, ratings)=>{
      if(err){
        res.send(err);
      }
      else{
        res.send(ratings);
      }
    })
  });


module.exports = router;