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
    const name = req.body.queryResult.parameters.name.name;
    const intentName = req.body.queryResult.intent.displayName;

    
    //Create fulfillment_text variable
    var fulfillment_text = 'Some text initially';

     //Create a response object
     var response = {
        'fulfillment_text': fulfillment_text,
    }

    console.log(req.body);
    if(intentName == 'searchByName'){
        Survivor.find({name: {"$regex": name, "$options": "i"}}, (err, docs)=> {
            if(err) fulfillment_text = 'We encountered an error in finding '+name+'in our database.Please try again';
            
            if(!docs) {
                fulfillment_text = 'We couldnt find '+name+' in our database but we are rescuing more people and bringing them to our camps as we speak';
            }
            else{
                if(docs.length>1){
                    fulfillment_text = 'There were multiple matches, please enter the age';
                }
                else if(docs.length == 0){
                    fulfillment_text = 'We couldnt find '+name+' in our database but we are rescuing more people and bringing them to our camps as we speak';
                }
                else {
                    fulfillment_text = 'We have successfully located a '+name+' in one our camps, the age mentioned is '+docs.age;
                }
            }
            response = {
                'fulfillment_text': fulfillment_text,
            }

            res.json(response);
        });
    }
    else if(intentName == 'whatIsStatus'){
        Survivor.find({name: {"$regex": name, "$options": "i"}}, (err, docs)=> {
            if(err) condition = 'We encountered some error in finding '+name+'in our database.Please try again';
            
            if(!docs) {
                condition = 'We couldnt find '+name+' in our database but we are rescuing more people and bringing them to our camps as we speak';
            }
            else{
                if(docs.length>1){
                    condition = 'There were multiple matches, please enter the age';
                }
                else if(docs.length == 0){
                    condition = 'We couldnt find '+name+' in our database but we are rescuing more people and bringing them to our camps as we speak';
                }
                else{
                    const medicalTag = docs.medicalTag;
                    var condition = '';
                    if(medicalTag == 'red') condition = name+' has suffered some injuries and is being attended by doctors';
                    else if(medicalTag == 'blue') condition = name+' has suffered minor injuries and is all right';
                    else condition = name+' is not injured and is safe'
    
                }
            }
            response = {
                'fulfillment_text': condition,
            }

            res.json(response);
        });
    }
    else if(intentName == 'whereIsHE'){
        Survivor.find({name: {"$regex": name, "$options": "i"}}, (err, docs)=> {
            if(err) fulfillment_text = 'We encountered some error in finding '+name+'.Please try again';
            
            if(!docs) {
                fulfillment_text = 'We couldnt find '+name+' in our database but we are rescuing more people and bringing them to our camps as we speak';
            }
            else{
                if(docs.length>1){
                    fulfillment_text = 'There were multiple matches, please enter the age';
                }
                else if(docs.length == 0){
                    fulfillment_text = 'We couldnt find '+name+' in our database but we are rescuing more people and bringing them to our camps as we speak';
                }
                else{
                    const campID = docs.campID;
                    Camp.find({campID: campID}, (err, docs)=>{
                        if(err) fulfillment_text = 'We encountered some error in locating the camp.Please try again';
                        else fulfillment_text = name+ ' is in camp '+campID+' which is located at '+docs.address;
                    });
                    
                }
            }
            response = {
                'fulfillment_text': fulfillment_text,
            }

            res.json(response);
        });
    }
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
    
});
module.exports = router;