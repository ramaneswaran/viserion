const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
    doctorID: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    campID: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Doctor', doctorSchema);