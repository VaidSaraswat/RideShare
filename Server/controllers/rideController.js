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

  .put((req, res)=>{
    let ride = new Ride();
    ride.departingDate = req.body.departingDate;
    ride.departingLocation = req.body.departingLocation;
    ride.departingTime = req.body.departingTime;
    ride.arrivingLocation = req.body.arrivingLocation;
    ride.price =  req.body.price;
    if(req.body.dropOffAlong.toLowerCase() === 'yes'){
      ride.dropOffAlong = true;
    } 
    else{
      ride.dropOffAlong = false;
    }
    let driverInfo = {name: req.body.name, number: req.body.number};
    ride.driverInfo = driverInfo;

    ride.save((err)=>{
      if(err){
        res.send(err);
      }
      else{
        res.json({message: 'Ride was created successfully'});
      }
    })
  })

module.exports = router;