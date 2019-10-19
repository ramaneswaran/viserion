const mongoose = require('mongoose');

const survivorSchema = mongoose.Schema({
    survivorID: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    sex: {
        type: String,
        required: true,
    },
    disability: {
        type: String,
        required: true,
    },
    campID: {
        type: String,
        required: true,
    },
    medicalTag: {
        type: String,
        required: true,
    },
    rescuedFrom: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Survivor', survivorSchema);