const express = require('express');
const router = express.Router();

//Setting up middleware for parsing post request
router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.post('/search', (req, res)=>{
    //Use intent name to give diff response

    
    const intentName = req.body.intent.displayName;
    
    if(intentName == 'searchByName'){
        const name = req.queryResult.parameter.name;
        var response = {
            'fulfillment_text': 'Dont worry we will find '+name,
        }
        //Also if result turns out empty return sorry message
    }
    else if(intentName == 'whatIsStatus'):
        //Send the medical condition
    else if(intentName == 'whereIsHE'):
        //send camp data
    else if(intentName == 'connect'):
        //let them know if they can connect
    else if(intentName == 'searchByAge'):
        //Refine result or give up
    else if(intentName == 'scheduleCall'):
        //Schedule a call and call it a day
    else if(intentName == 'diffNameSearch'):
        //End the conversation
    res.json(response)
})

module.exports = router;