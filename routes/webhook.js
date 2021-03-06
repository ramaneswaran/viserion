const express = require('express');
const router = express.Router();

//Import DB models
const Survivor = require('../models/Survivor');
const Camp = require('../models/Camp');
const Contact = require('../models/Contact');
const Schedule = require('../models/Schedule');
const Time = require('../models/Time');


//Setting up middleware for parsing post request
router.use(express.json());
router.use(express.urlencoded({extended: true}));

//Helper Function
function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
}

router.post('/search', (req, res)=> {
    //Use intent name to give diff response
    const intentName = req.body.queryResult.intent.displayName;

    
    //Create fulfillment_text variable
    var fulfillment_text = 'Some text initially';

     //Create a response object
     var response = {
        'fulfillment_text': fulfillment_text,
        
    }

    if(intentName == 'searchByName'){
        const name = req.body.queryResult.parameters.name.name;
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
                    fulfillment_text = 'We have successfully located a '+name+' in one our camps, the age mentioned is '+docs[0].age;
                }
            }
            response = {
                'fulfillment_text': fulfillment_text,            
            }

            res.json(response);
        });
    }
    else if(intentName == 'whatIsStatus'){
        const name = req.body.queryResult.parameters.name.name;
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
                    const medicalTag = docs[0].medicalTag;
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
        console.log(req.body);
        const name = req.body.queryResult.parameters.name.name;

        Survivor.find({name: {"$regex": name, "$options": "i"}}, (err, docs)=> {
            if(err) fulfillment_text = 'We encountered some error in finding '+name+'.Please try again';
            
            if(!docs) {
                fulfillment_text = 'We couldnt find '+name+' in our database but we are rescuing more people and bringing them to our camps as we speak';
                response = {
                    'fulfillment_text': fulfillment_text,
                    
                }
                res.json(response);
            }
            else{
                if(docs.length>1){
                    fulfillment_text = 'There were multiple matches, please enter the age';
                    response = {
                        'fulfillment_text': fulfillment_text,
                        
                    }
                    res.json(response);
                }
                else if(docs.length == 0){
                    fulfillment_text = 'We couldnt find '+name+' in our database but we are rescuing more people and bringing them to our camps as we speak';
                    response = {
                        'fulfillment_text': fulfillment_text,
                        
                    }
                    res.json(response);
                }
                else{
                    const campID = docs[0].campID;
                    Camp.find({campID: campID}, (err, docs)=>{
                        
                        if(err) fulfillment_text = 'We encountered some error in locating the camp.Please try again';
                        else fulfillment_text = name+ ' is in camp '+campID+' which is located at '+docs[0].address;

                        response = {
                            'fulfillment_text': fulfillment_text,
                        }
                        res.json(response);
                    });
                    
                }
            }
               
        });
    }
    else if(intentName == 'searchByAge'){
        console.log(req.body)
        const age = req.body.queryResult.parameters.age.amount - 0;
        const name = req.body.queryResult.parameters.name.name;
        Survivor.find({name: {"$regex": name, "$options": "i"}, age: age}, (err, docs)=> {
            if(err) fulfillment_text = 'We encountered some error in finding '+name+'.Please try again';
            
            if(!docs) {
                fulfillment_text = 'We couldnt find '+name+' in our database but we are rescuing more people and bringing them to our camps as we speak';
            }
            else{
                if(docs.length>1){
                    fulfillment_text = 'There were multiple matches, we cannot refine search further';

                }
                else if(docs.length == 0){
                    fulfillment_text = 'We couldnt find '+name+' in our database but we are rescuing more people and bringing them to our camps as we speak';
                }
                else{
                    fulfillment_text = 'We have successfully located a '+name+' in one our camps, the age mentioned is '+docs[0].age;                  
                }
            }
            response = {
                'fulfillment_text': fulfillment_text,
            }

            res.json(response);
        });
    }
   
    else if(intentName == 'getUID'){
        const token = req.body.queryResult.parameters.token;
        const name = req.body.queryResult.parameters.name.name;
        var rId = '';
        Survivor.find({name: {"$regex": name, "$options": "i"}}, (err, docs)=> {
            if(err) console.log(err);

            if(!docs) {
                console.log('Resulted in null return');
                } else {
                    rId = docs[0].id;
                    console.log('Got rId ',rId);

                    Time.find({}, (err, docs)=>{
                        if(err) console.log(err);
                        if(!docs) {
                            console.log('Resulted in null return');
                        } else{
                            var freeTime = docs[0].time;
                            var curTime = new  Date();
                            
                            //Check for sys time
                            if(curTime<freeTime){
                                docs[0].time = addMinutes(freeTime, 5);
                                docs[0].save();
                                new Schedule({
                                    rescueeId: rId,
                                    token: token,
                                    time: addMinutes(freeTime,5) //After 5mins
                                }).save().then((savedTime)=>{
                                    console.log(savedTime);
                                    dateString = savedTime.time;
                                    var response = {
                                        'fulfillment_text': 'Your call has been scheduled for '+dateString.toString()
                                    }
                                    //Update the time
                                    res.json(response);
                                })
                            } else {
                                docs[0].time = addMinutes(curTime, 7);
                                docs[0].save();
                                new Schedule({
                                    rescueeId: rId,
                                    token: token,
                                    time: addMinutes(curTime, 2) //Within a minute
                                }).save().then((savedTime)=>{
                                    console.log(savedTime);
                                    dateString = savedTime.time;
                                    var response = {
                                        'fulfillment_text': 'Your call has been scheduled for '+dateString.toString()
                                    }
                                    //Update the time
                                    res.json(response);
                                })
                            }
                        }
                    })
            }
        
    
        });
    }
});
module.exports = router;