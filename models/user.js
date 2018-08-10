const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');


const  UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Number
    }
});

const  User = mongoose.model('User', UserSchema);

module.exports = User;