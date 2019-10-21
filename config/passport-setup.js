const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

//UserModel
const UserModel = require('../models/UserModel');
passport.use(
    new GoogleStrategy({
        //options for strategy 
        callbackURL: '/index/google/redirect',
        clientID: "822226994276-tvo7s7kdsfn97utr6tnu91mv0dr5epkr.apps.googleusercontent.com" ,
        clientSecret: "qKJnxEl7LtejZjTYCgpu60RP"
    },(accessToken, refreshToken, profile, done)=>{
        new UserModel({
            username: profile.displayName,
            googleId: profile.id
        }).save().then((savedUser)=>{
            console.log(savedUser);
        });
        console.log('passport CB fired')
    })
)