const mongoose = require('mongoose');
const { Schema } = mongoose;

const doctorIdSchema = new Schema({
    doctorId: String
})

const DoctorId = mongoose.model('DoctorId', doctorIdSchema);
module.exports = DoctorId;