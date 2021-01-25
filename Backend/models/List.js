const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');

// Defines users schema
const ListSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref: 'User'     // Defines the user_id field as a reference to a 'User'.
    },

    list: {
        type: Object,
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

module.exports = mongoose.model('List', ListSchema);