const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.route('/api/users')

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
  
  .post((req, res)=>{
    let user = new User();
    user.name = req.body.name;
    user.number = req.body.number;
    user.password = req.body.password;

    user.save((err)=>{
      if(err)
      {
        res.send(err);
      }
      else{
        res.json({ message: 'User Created' })
      }
    })
  });

  module.exports = router;