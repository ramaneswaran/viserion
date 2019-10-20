const express = require('express');
const router = express.Router();

//Setting up middleware for parsing post request
router.use(express.json());
router.use(express.urlencoded({extended: true}));


router.get('/', (req, res)=>{
    res.render('index');
});

router.get('/login', (req, res)=>{
    res.render('login');
});

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