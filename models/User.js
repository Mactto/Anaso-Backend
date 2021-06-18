const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 20,
        unique: 1
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
    role : {
        type: Number,
        default: 0
    }
})

userSchema.pre('save', function(next) {
    var user = this;

    if(user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) return next(err);
            user.password = bcrypt.hashSync(user.password, 10);
            next()
        })
    } else {
        next()
    }
});

userSchema.methods.comparePasword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch)
    })
}

const User = mongoose.model('User', userSchema);

module.exports = { User }