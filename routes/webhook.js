const express = require('express');
const router = express.Router();

//Import DB models
const Survivor = require('../models/Survivor');
const Camp = require('../models/Camp');
const Contact = require('../models/Contact');

//Setting up middleware for parsing post request
router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.post('/search', (req, res)=> {
    //Use intent name to give diff response

    
    const intentName = req.body.intent.displayName;
    
    
        const name = req.queryResult.parameter.name;
        
        Survivor.find({name: {"$regex": name, "$options": "i"}}, (err, docs)=> {
            let fulfilment_text = '';
            if(err) fulfillment_text = 'Some error occured';

            if(docs.length == 0) fulfillment_text = 'We couldnt find '+name+' in our database but we are rescuing more people and bringing them to our camps as we speak';
            else if(docs.length>1){
                fullfillment_text = 'There were multiple matches, please enter the age';
            }
            else {
                fullfillment_text = 'We have located '+name;
            }
            var response = {
                'fulfillment_text': 'Don\'t worry we will find '+name,
            }
        });
    
    // else if(intentName == 'whatIsStatus'){
    //     //Send the medical condition
    //     }
    // else if(intentName == 'whereIsHE'){
    //     //send camp data
    // }
    // else if(intentName == 'connect'){
    //     //let them know if they can connect
    // }
    // else if(intentName == 'searchByAge'){
    //     //Refine result or give up
    // }
    // else if(intentName == 'scheduleCall'){
    //     //Schedule a call and call it a day
    //     }
    // else if(intentName == 'diffNameSearch'){
    //     //End the conversation
    // }
    
    res.json(response)
});
module.exports = router;