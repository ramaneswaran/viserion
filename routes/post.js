const express = require('express');
const router = express.Router();

//Import DB models
const Survivor = require('../models/Survivor');
const Camp = require('../models/Camp');
const Contact = require('../models/Contact');
const Deceased = require('../models/Deceased');
const Doctor = require('../models/Doctor');

//Setting up middleware for parsing post request
router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.post('/deceased', (req, res)=>{
    const newDeceased = new Deceased({
        ageGroup: req.body.ageGroup,
        sex: req.body.sex,
        foundAt: req.body.foundAt
    });
    newDeceased.save((err, savedDoc)=>{
        if(err) console.log('Error');
        else console.log(savedDoc)
        res.json(savedDoc);
    })
});

router.post('/camp', (req, res)=>{
    const newCamp = new Camp({
        campID: req.body.campID,
        address: req.body.address,
    });
    newCamp.save((err, savedDoc)=>{
        if(err) console.log(err);
        else console.log(savedDoc);
        res.json(savedDoc);
    })
});

router.post('/survivor', (req, res)=>{
    const newSurvivor = new Survivor({
        name: req.body.name,
        age: req.body.age,
        sex: req.body.sex,
        disability: req.body.disability,
        campID: req.body.campID,
        medicalTag: req.body.medicalTag,
        rescuedFrom: req.body.rescuedFrom,
        contact: req.body.contact,
        relation: req.body.relation,
    });
    newSurvivor.save((err, savedDoc)=>{
        if(err) console.log(err);
        else console.log(savedDoc);
        res.json(savedDoc);
    })
});
module.exports = router;