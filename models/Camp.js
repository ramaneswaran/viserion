const mongoose = require('mongoose')

const campSchema = mongoose.Schema({
    campID: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Camp', campSchema);