const express = require('express');
const router = express.Router();

//Import DB models
const Survivor = require('../models/Survivor');
const Camp = require('../models/Camp');
const Contact = require('../models/Contact');
const deceased = require('../models/Deceased');
const Doctor = require('../models/Doctor');

//Setting up middleware for parsing post request
router.use(express.json());
router.use(express.urlencoded({extended: true}));