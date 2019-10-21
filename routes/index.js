const express = require('express');
const router = express.Router();
const passport = require('passport');
const cookieSession = require('cookie-session');
const passportSetup = require('../config/passport-setup');


//Setting up middleware for parsing post request
router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys : ['balerion']
}));

//Initialise passport
router.use(passport.initialize());
router.use(passport.session());

//Middleware
const authCheck = (req, res, next) =>{
    if(!req.user){
        //User not logged in
        res.redirect('/login');

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

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res)=>{
    res.send('Callback uri');
})

router.get('/profile', authCheck, (req, res)=>{
    res.render('profile');
});

router.get('/profile/tyrion', authCheck, (req, res)=>{
    res.render('chatbot');
});

router.get('/profile/connect', authCheck, (req, res)=>{
    res.render('connect')
});



module.exports = router;