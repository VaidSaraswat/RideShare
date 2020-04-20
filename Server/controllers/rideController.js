const express = require('express');
const router = express.Router();
const Ride = require('../models/ride.js');

function parseDate(input, time){
  let parts = input.match(/(\d+)/g);
  let hours = parseInt(time.substring(0, 2));
  let mins = parseInt(time.substring(3, 5));
  return new Date(parts[0], parts[1]-1, parts[2], hours, mins);
}

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
router.route('/api/rides')
  //Get all the rides
  .get(authenticateToken, (req, res)=>{
    //Athenticate User
    if(req.payload !== null){
      Ride.find((err, rides)=>{
        if(err){
          res.send(err);
        }
        else{
          //Sort rides by dates, the earlier ones are showed first
          rides.sort((a, b)=> a.departingDate - b.departingDate); 
          res.send(rides);
        }
      });
    }
  })

  //Create ride and save to database
  .put(authenticateToken, async (req, res)=>{
    if(req.payload !== null){
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
    }
  })

  //Delete ride from database
  .delete(authenticateToken, (req, res)=>{
    if(req.payload !== null){
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
    }
  });

router.route('/api/rides/updateName')
  .post((req, res)=>{
    Ride.updateMany({driverName: req.body.oldName}, {driverName: req.body.newName}, (err)=>{
      if(err){
        res.send(err);
      }
      else{
        res.send('Rider name was updated successfully!');
      }
    });
  });

router.route('/api/rides/updateNumber')
  .post((req, res)=>{
    Ride.updateMany({driverName: req.body.name}, {driverNumber: req.body.newNumber}, (err)=>{
      if(err){
        res.send(err);
      }
      else{
        res.send('Ride phone number was updated successfully!');
      }
    });
  });

module.exports = router;