const express = require('express');
const router = express.Router();

//Setting up middleware for parsing post request
router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.post('/search', (req, res)=>{
    console.log(req.body);
    console.log("Say something")

})

module.exports = router;