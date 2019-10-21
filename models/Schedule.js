const mongoose = require('mongoose');

const scheduleSchema = mongoose.Schema({
    rescueeId: {
        type: String,
        required: true
    },
    token: {
        type:String,
        required: true,
    },
    time: {
        type: Date,
        required: true,
    }
});

module.exports = mongoose.model('Schedule', scheduleSchema);