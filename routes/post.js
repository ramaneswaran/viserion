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