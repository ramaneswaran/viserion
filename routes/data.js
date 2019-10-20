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

module.exports = router;

/*
PLOT 1 : PATIENTS AT EACH CAMP : BAR PLOT
PLOT 2 : PATIENTS AT EACH CAMP: PIE CHART : BASED ON MEDICAL TAG
PLOT 3 : DOCTORS AT EACH CAMP : BAR GRAPH 
PLOT 4 : DEATH TOLL : MEN AND WOMEN : BAR GRAPH can be use for plot7
PLOT 5 : DEATH TOLL : CATEGORY-> AGE : BAR GRAPH  can be used for plot6
PLOT 6 : DEATH TOLL : CATEGORY-> AGE : PIE CHART
PLOT 7 : DEATH TOLL : MEN AND WOMEN  : PIE CHART  
*/

router.post('/plot1', (req, res)=>{
    Survivor.aggregate([{
        $group: {
            _id: '$campID',
            count: {$sum: 1}
        }
    }
    ], (err, result)=>{
        if(err) console.log(err);
        else res.json(result);
    });

    /*
    [
    {
        "_id": "19A",
        "count": 1
    },
    {
        "_id": "19B",
        "count": 1
    },
    {
        "_id": "19C",
        "count": 1
    }
]
*/
});


router.post('/plot2', (req, res)=>{
    Survivor.aggregate([{
        $group: {
            _id: {
                campID : '$campID',
                medicalTag: '$medicalTag'
            },
            count: {$sum: 1}
        }
    }
    ], (err, result)=>{
        if(err) console.log(err);
        else res.json(result);
    });

    /*
    [
    {
        "_id": "F",
        "count": 1
    },
    {
        "_id": "M",
        "count": 2
    }
]*/
});


router.post('/plot3', (req, res)=>{
    Doctor.aggregate([{
        $group: {
            _id: {
                campID: "$campID"
            }
        }
    }
    ], (err, result)=>{
        if(err) console.log(err);
        else res.json(result);
    });
});

router.post('/plot4', (req, res)=>{
    Deceased.aggregate([{
        $group: {
            _id: '$sex',
            count: {$sum: 1}
        }
    }
    ], (err, result)=>{
        if(err) console.log(err);
        else res.json(result);
    });
});


router.post('/plot5', (req, res)=>{
    Doctor.aggregate([{
        $group: {
            _id: '$campID',
            count: {$sum: 1}
        }
    }
    ], (err, result)=>{
        if(err) console.log(err);
        else res.json(result);
    });
});
