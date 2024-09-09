const express = require('express');
const Appointment = require('../models/Appointment');
const AprvdAppointment = require('../models/ApprovedAppointments');
const DoctorId = require('../models/doctorId');
const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
    res.render('appointment.ejs')
});
router.post('/', async (req, res) => {
    let customerId = res.locals.id;
    let {
        petname,
        number,
        date,
        time,
        symptomps } = req.body;

    let newAppointment = new Appointment({
        customerId,
        petname,
        number,
        date,
        time,
        symptomps
    });
    await newAppointment.save();
    // console.log(date);
    res.redirect('/customerprofile');
});

router.get('/view', async (req, res) => {
    let appointments = await Appointment.find({});
    if (!res.locals.authenticated) {
        res.send('please login first');
    }
    res.render('viewappointment.ejs', { appointments: appointments });
})

router.post('/approve/:id/:docid', async (req, res) => {
    let { id, docid } = req.params;

    let doctor = await DoctorId.find({ doctorId: docid });

    if (doctor.length === 0) {
        return res.send("Sorry, You're not a doctor");
    }

    let apntmnt = await Appointment.findById(id);
    await Appointment.findByIdAndDelete(id);

    let nApvrdApntmnt = new AprvdAppointment({
        doctorId: docid,
        customerId: apntmnt.customerId,
        number: apntmnt.number,
        date: apntmnt.date,
        time: apntmnt.time,
        symptomps: apntmnt.symptomps,
    })
    await nApvrdApntmnt.save();
    res.redirect('/');
})


module.exports = router;