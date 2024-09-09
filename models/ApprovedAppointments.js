const mongoose = require('mongoose');
const { Schema } = mongoose;

const aprvdAppointmentSchema = new Schema({
    doctorId: String,
    customerId: String,
    number: String,
    date: Date,
    time: String,
    symptomps: String,
})

const AprvdAppointment = mongoose.model('AprvdAppointment', aprvdAppointmentSchema);
module.exports = AprvdAppointment;