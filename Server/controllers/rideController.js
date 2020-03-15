const express = require('express');
const router = express.Router();
const Ride = require('../models/ride.js');

router.route('/api/rides')
  .get((req, res)=>{
    Ride.find((err, rides)=>{
      if(err){
        res.send(err);
      }
      else{
        res.json(rides);
      }
    })
  })

module.exports = router;