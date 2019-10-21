const express = require('express');
const router = express.Router();
const passport = require('passport');
const cookieSession = require('cookie-session');
const passportSetup = require('../config/passport-setup');


//DB Models
const Schedule = require('../models/Schedule');



//Setting up middleware for parsing post request
router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys : ['balerion']
}));

//Helper Function
function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
}

//Function to authenticate call
const authorise = function(token){
    Schedule.find({token: token }, (err, documents)=>{
        if(err) console.log(err);
        if(!docs){
            console.log("Null value returned");
        } else{
            const initTime = docs[0].time;
            const finTime = addMinutes(date, 5);
            const curTime = new Date();

            if( (curTime >= initTime) && (finalTime> curTime)){
                return true;
            }else return false
        }
    })
}

//Initialise passport
router.use(passport.initialize());
router.use(passport.session());

//Middleware
const authCheck = (req, res, next) =>{
    if(!req.user){
        //User not logged in
        res.redirect('/index/login');

    }else{
        next();
    }
}

router.get('/', (req, res)=>{
    res.render('index');
});

router.get('/login', (req, res)=>{
    res.render('login');
});

router.get('/logout',(req, res)=>{
    req.logout();
    res.redirect('/index');
})

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res)=>{
    res.redirect('/index/profile');
})

router.get('/profile', authCheck,(req, res)=>{
    res.render('profile', {user: req.user})
});

router.get('/profile/tyrion', authCheck, (req, res)=>{
    res.render('chatbot');
});

router.get('/profile/connect', authCheck, (req, res)=>{
    const allowed = authorise(req.user.token);
    res.render('connect', {allowed: allowed});
});



module.exports = router;