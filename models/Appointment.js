const mongoose = require('mongoose');
const { Schema } = mongoose;

const appointmentSchema = new Schema({
    customerId: String,
    petname: String,
    number: String,
    date: Date,
    time: String,
    symptomps: String
})

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;