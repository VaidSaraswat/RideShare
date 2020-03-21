const express = require('express');
const router = express.Router();
const Ride = require('../models/ride.js');

function parseDate(input, time){
  let parts = input.match(/(\d+)/g);
  let hours = parseInt(time.substring(0, 2));
  let mins = parseInt(time.substring(3, 5));
  return new Date(parts[0], parts[1]-1, parts[2], hours, mins);
}

router.route('/api/rides')
  //Get all the rides
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

  //Create ride and save to database
  .put(async (req, res)=>{
    //Create ride object and format information
    let ride = new Ride();
    ride.departingDate = parseDate(req.body.departingDate, req.body.departingTime);
    ride.departingLocation = req.body.departingLocation;
    ride.departingTime = req.body.departingTime;
    ride.arrivingLocation = req.body.arrivingLocation;
    ride.price =  req.body.price;
    ride.driverName = req.body.driverName;
    ride.driverNumber = req.body.driverNumber;

    //Check if the driver is willing to do drop offs along the way
    if(req.body.dropOffAlong.toLowerCase() === 'yes'){
      ride.dropOffAlong = true;
    } 
    else{
      ride.dropOffAlong = false;
    }

    //Check if the ride already exists if so then redirect indicating that the ride was already created, otherwise save the ride to the db
    let exists = await Ride.exists({departingDate: ride.departingDate, departingLocation: ride.departingLocation, departingTime: ride.departingTime, arrivingLocation: ride.arrivingLocation, price: ride.price, driverName: ride.driverName, driverNumber: ride.driverNumber});

    if(exists){
      res.send('Sorry this ride was already created!');
    }
    else{
      ride.save((err)=>{
        if(err){
          res.send(err);
        }
        else{
          res.json({message: 'Ride was created successfully'});
        }
      });
    }
  })

  //Delete ride from database
  .delete((req, res)=>{
    let name = req.body.name;
    let date = parseDate(req.body.departingDate, req.body.departingTime);
    let location = req.body.departingLocation;

    Ride.findOneAndRemove({driverName: name, departingDate: date, departingLocation: location}, (err)=>{
      if(err){
        res.send(err);
      }
      else{
        res.json({message: 'Ride was deleted successfully'});
      }
    });
  });

module.exports = router;