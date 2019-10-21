const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const uniqid = require('uniqid');

//UserModel
const UserModel = require('../models/UserModel');

passport.serializeUser((user, done) =>{
    done(null, user.id);
});

passport.deserializeUser((id, done) =>{
    UserModel.findById(id).then((user)=>{
        done(null, user);
    })
    
});

passport.use(
    new GoogleStrategy({
        //options for strategy 
        callbackURL: '/index/google/redirect',
        clientID: "822226994276-tvo7s7kdsfn97utr6tnu91mv0dr5epkr.apps.googleusercontent.com" ,
        clientSecret: "qKJnxEl7LtejZjTYCgpu60RP"
    },(accessToken, refreshToken, profile, done)=>{
        //Check if user exists in db
        UserModel.findOne({googleId: profile.id}).then((currentUser)=>{
            if(currentUser){
                //already user in DB
                console.log('User is :',currentUser);
                done(null, currentUser);
            } else{
                new UserModel({
                    username: profile.displayName,
                    googleId: profile.id,
                    uid: uniqid(),
                }).save().then((savedUser)=>{
                    console.log(savedUser);
                    done(null, savedUser);
                });
            }
        })
        
        console.log('passport CB fired')
    })
)