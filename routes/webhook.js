const express = require('express');
const router = express.Router();

//Setting up middleware for parsing post request
router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.post('/search', (req, res)=>{
    const name = req.queryResult.parameter.name
    var response = {
        'fulfillment_text': 'Dont worry we will find '+name,
    }
    res.json(response)
})

module.exports = router;