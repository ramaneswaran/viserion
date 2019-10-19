const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    contactID: {
        type: String,
        required: true,
    },
    name : {
        type : String,
        required: true,
        min: 6,
        max: 255

    },

    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    relation: {
        type : String,
        required: true,
    }
});

module.exports = mongoose.model('User', userSchema);