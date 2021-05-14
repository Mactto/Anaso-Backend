const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 20
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    profileImage: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    major: {
        type: String
    },
    university: {
        type: String
    },
    description: {
        type: String,
        maslength: 200
    },
    hitCount: {
        type: Number
    },
    hashTags: {
        type: Array,
        default: []
    },
    projects: {
        type: Array,
        default: []
    }
})

const User = mongoose.model('User', userSchema);

module.exports = { User }