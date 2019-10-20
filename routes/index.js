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
})



module.exports = router;