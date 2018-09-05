const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt=require('jsonwebtoken');
const config = require('../config/db');
const User = require('../models/user');

//Register and instantiate new user from model
router.post('/register', (req, res, next)=>{
    let newUser = new User({
        fullname: req.body.fullname,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        created_date: req.body.created_date
    });
    User.addUser(newUser,(err, user)=>{
        if(err){
            res.json({success: false, msg:'Registration failed'});
        } else {
            res.json({success: true, msg: 'Registration successful '});
        }
    });
   // res.send("Register");
});

//Authenticate
router.post('/authenticate', (req, res, next)=>{
    const username=req.body.username;
    const password = req.body.password;
// check for username
    User.getUserByUsername(username, (err, user)=>{
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg: 'User not found'});
        }

        User.comparePassword(password, user.password,(err, isMatch)=>{
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 259200 //expires in 3 days
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        fullname: user.fullname,
                        username: user.username,
                        email: user.email,
                       
                    }
                });
            }else {
                return res.json({success: false, msg: 'Wrong Password'});

            }
        }
    )
    });
});

//Profile and protecting the profile route
router.get('/profile', passport.authenticate('jwt', {session:false}),(req, res, next)=>{
    res.json({user: req.user});
    res.send('PROFILE');
});

module.exports=router;