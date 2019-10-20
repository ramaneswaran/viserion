const mongoose = require('mongoose')

const deceasedSchema = mongoose.Schema({
    ageGroup: {
        type: String,
        required: true,
    },
    sex: {
        type: String,
        required: true,
    },
    foundAt: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Deceased', deceasedSchema);