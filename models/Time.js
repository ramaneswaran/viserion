const mongoose = require('mongoose');

const timeSchema = mongoose.Schema({
    time: {
        type: Date,
        required: true,
    }
});

module.exports = mongoose.model('Time', timeSchema);