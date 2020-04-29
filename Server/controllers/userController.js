const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
require('dotenv').config();

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
        req.payload = payload;
      }
    });
    next();
  }
  
}
router.route('/api/users')
  //Get all the users
  .get(authenticateToken, (req, res)=>{
    //Only get users if the payload is set
    if(req.payload !== null){
      User.find((err, users)=>{
        if(err){
          res.send(err);
        }
        else{
          console.log('Sending back users');
          res.json(users);
        }
      });
    }
  });

router.route('/api/users/updateName')
  .post(authenticateToken, async (req, res)=>{
    //Authenticate user
    if(req.payload !== null){
      //Check if the name is unique, if it is then update the name otherwise send error indicating that the name already exists
      let exists = await User.exists({name: req.body.newName});
      if(exists){
        res.send('Sorry that name already exists');
      }
      else{
        User.findOneAndUpdate({name: req.body.oldName}, {name: req.body.newName}, (err)=>{
          if(err){
            res.send(err);
          }
          else{
            res.send('Your name was updated successfully!');
          }
        });
      }
    }
  });

router.route('/api/users/updateNumber')
  .post(authenticateToken, (req, res)=>{
    //Authenticate user
    if(req.payload !== null){
      User.findOneAndUpdate({name: req.body.name}, {number: req.body.newNumber}, (err)=>{
        if(err){
          res.send(err);
        }
        else{
          res.send('Your phone number ws updated successfully!');
        }
      });
    }
  });

router.route('/api/users/updatePassword')
  .post(authenticateToken, async (req, res)=>{
    //Authenticate user
    if(req.payload !== null){
      let user = await User.findOne({name: req.body.name});
      if(user == null){
        res.send('Invalid Username!');
      }
      else{
        try{
          if(await bcrypt.compare(req.body.password, user.password)){
  
            const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
            User.findOneAndUpdate({name: req.body.name}, {password: hashedPassword}, (err)=>{
              if(err){
                res.send(err);
              }
              else{
                res.send('Your password was updated successfully!');
              }
            });
          }
          else{
            res.send('Invalid Credentials!');
          } 
        }
        catch{
          res.send('Error!');
        }
      }
    }  
  });

router.route('/api/users/deleteProfile')
  //Delete user from system
  .delete(authenticateToken, (req, res)=>{
    if(req.payload !== null){
      User.findOneAndRemove({name: req.body.name}, (err)=>{
        if(err){
          res.send(err);
        }
        else{
          res.send('User was deleted successfully');
        }
      });
    }
  });

  module.exports = router;