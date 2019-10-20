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
    const name = req.body.queryResult.parameters.name;
   
    //Create fulfillment_text variable
    var fulfillment_text = 'Some text initially';

     //Create a response object
     var response = {
        'fulfillment_text': fulfillment_text,
    }

    console.log(req.body);
    Survivor.find({name: {"$regex": name, "$options": "i"}}, (err, docs)=> {
        console.log('Inside this find function with name as '+ name);
        if(err) fulfillment_text = 'Some error occured';
        
        if(!docs) {
            fulfillment_text = 'We couldnt find '+name+' in our database but we are rescuing more people and bringing them to our camps as we speak';
        }
        else{
            if(docs.length>1){
                fulfillment_text = 'There were multiple matches, please enter the age';
            }
            else if(docs.length == 0){
                fulfillment_text = 'There were zero matches';
            }
            else {
                fulfillment_text = 'We have located '+name;
            }
        }
        response = {
            'fulfillment_text': fulfillment_text,
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