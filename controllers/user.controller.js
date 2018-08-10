const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database')
const  User  = require('../models/user');
const userService = require('../services/userService')


module.exports.register =  (req, res, next) => {

    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    userService.addUser(newUser, (err, user) => {
        if(err){
            res.json({success: false, msg: 'failed to register the user'});
        }else{
            res.json({success: true, msg: 'user successfully registered'});
        }
    });

}

module.exports.authenticate = (req, res, next) => {

    let username = req.body.username;
    let password = req.body.password;

    userService.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg: 'user not found'});
        }
        userService.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800
                });
                res.json({
                    success: true,
                    token: 'JWT '+ token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                })
            }else{
                res.json({success: false, msg: 'Wrong Password'});
            }
        });
    })

}
// const app = require('express');
// app.use(passport.initialize());

module.exports.getProfile = function(req, res, next) {
    passport.authenticate('jwt', function(err, user, info) {
        return res.send(user);
    })(req, res, next);
}