const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportSetup = require('../config/passport-setup');
//Setting up middleware for parsing post request
router.use(express.json());
router.use(express.urlencoded({extended: true}));


//Route middle ware

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

router.get('/profile', (req, res)=>{
    res.render('profile');
});

router.get('/profile/tyrion', (req, res)=>{
    res.render('chatbot');
});

router.get('/profile/connect', (req, res)=>{
    res.render('connect')
});



module.exports = router;