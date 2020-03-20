const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.js');

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
    let exists = await User.exists({name: req.body.name});

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

  //Update user information
  .post((req, res)=>{
    let newUserInfo = {};
    if(req.body.newName == ''){
      newUserInfo.name = req.body.oldName;
    }
    else{
      newUserInfo.name = req.body.newName;
    }
    if(req.body.newNumber == ''){
      newUserInfo.number = req.body.oldNumber;
    }
    else{
      newUserInfo.number = req.body.newNumber;
    }
    if(req.body.newPassword == ''){
      newUserInfo.password = req.body.oldPassword;
    }
    else{
      newUserInfo.password = req.body.newPassword;
    }

    User.findOneAndUpdate({name: req.body.oldName}, newUserInfo, (err)=>{
      if(err){
        res.send(err);
      }
      else{
        res.send('Your information is updated');
      }
    });
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

  module.exports = router;