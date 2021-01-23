const mongoose = require('mongoose');

// Defines users schema
const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    
    password: {
        type: String,
        required: true
    },

    date_of_creation: {
        type: Date,
        default: Date.now
    },

    date_of_delection: {
        type: Date,
        required: false
    }
});

module.exports = mongoose.model('User', UserSchema);