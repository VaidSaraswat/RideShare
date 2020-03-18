const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

const changeStream = User.watch();
changeStream.on('change', (change)=>{
  console.log('The collection has changed!');
})
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
    let user = new User();
    user.name = req.body.name;
    user.number = req.body.number;
    user.password = req.body.password;

    //Check if the username is currently available if so then add to the db, otherwise notify them to use a different username
    let exists = await User.exists({name: user.name});

    if(exists == true){
      res.json({message: 'Sorry that user name is already taken!'});
    }
    else{
      user.save((err)=>{
        if(err)
        {
          res.send(err);
        }
        else{
          res.json({message: 'Account Created Successfully!' });
        }
      });
    }
  })

  //Delete user from system
  .delete((req, res)=>{
    User.findOneAndRemove({name: req.body.name}, (err)=>{
      if(err){
        res.send(err);
      }
      else{
        res.json({message: 'User was deleted successfully'});
      }
    });
  });

  module.exports = router;