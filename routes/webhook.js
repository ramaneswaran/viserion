const express = require('express');
const router = express.Router();

//Setting up middleware for parsing post request
router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.post('/search', (req, res)=>{
    console.log('got request');
})

module.exports = router;