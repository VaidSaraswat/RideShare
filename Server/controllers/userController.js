const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.js');

async function isUniqueName(name){
  let exists = await User.exists({name: name});
  if(exists){
    return true;
  }
  else{
    return false;
  }
}

router.route('/api/users')
  //Get all the users
  .get((req, res)=>{
    User.find((err, users)=>{
      if(err){
        res.send(err);
      }
      else{
        res.json(users);
      }
    })
  })
  
  //Create user
  .put(async (req, res)=>{
    //Check if the username is currently available if so then add to the db, otherwise notify them to use a different username

    let exists = await isUniqueName(req.body.name);
    if(exists){
      res.send('Sorry that user name is already taken!');
    }
    
    //Hash users password and store user into db
    else{
      let user = new User();
      user.name = req.body.name;
      user.number = req.body.number;

      try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        user.password = hashedPassword;

        user.save((err)=>{
          if(err)
          {
            res.send(err);
          }
          else{
            res.send('Account Created Successfully!');
          }
        });
        
      }
      catch{
        res.send('Error, something happend on server side');
      }
    }
  })

  //Delete user from system
  .delete((req, res)=>{
    User.findOneAndRemove({name: req.body.name}, (err)=>{
      if(err){
        res.send(err);
      }
      else{
        res.send('User was deleted successfully');
      }
    });
  });

router.route('/api/users/login')
  .post(async (req, res)=>{
    let user = await User.findOne({name: req.body.name});
    
    if(user == null){
      res.send('Cannot find user!');
    }
    else{
      try{
        if(await bcrypt.compare(req.body.password, user.password)){
          res.send('Success!');
        }
        else{
          res.send('Not Allowed!');
        } 
      }
      catch{
        res.send('Error!');
      }
    }
  });
  
router.route('/api/users/updateName')
  .post(async (req, res)=>{
    //Check if the name is unique, if it is then update the name otherwise send error indicating that the name already exists
    let exists = await isUniqueName(req.body.newName);

    if(exists){
      res.send('Sorry that name already exists');
    }

    else{
      User.findOneAndUpdate({name: req.body.oldName}, {name: req.body.newName}, (err)=>{
        if(err){
          res.send(err);
        }
        else{
          res.send('Your username was updated successfully!');
        }
      });
    }
  });

router.route('/api/users/updateNumber')
  .post((req, res)=>{
    User.findOneAndUpdate({name: req.body.name}, {number: req.body.newNumber}, (err)=>{
      if(err){
        res.send(err);
      }
      else{
        res.send('Your phone number was updated successfully');
      }
    });
  });

router.route('/api/users/updatePassword')
  .post(async (req, res)=>{
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
  });

  module.exports = router;