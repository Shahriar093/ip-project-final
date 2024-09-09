const express = require('express');
const User = require('../models/User');
const Appointment = require('../models/Appointment');
const AprvdAppointment = require('../models/ApprovedAppointments');
const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
    let cid = res.locals.id;
    let userDet = await User.findById(cid);
    // console.log(result);
    res.render('customerprofile.ejs', { customer: userDet });
});

router.get('/pending', async (req, res) => {
    let cid = res.locals.id;
    let result = await Appointment.find({ customerId: cid });
    // console.log(result);
    res.render('pendingappointment.ejs', { pappointments: result });
});

router.get('/apprvd', async (req, res) => {
    let cid = res.locals.id;
    let aappointment = await AprvdAppointment.find({ customerId: cid })
    // console.log(result);
    res.render('aprvdappointment.ejs', { aappointments: aappointment });
});

module.exports = router;