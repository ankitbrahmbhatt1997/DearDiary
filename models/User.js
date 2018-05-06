const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

let UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },


})

UserSchema.pre('save', function (next) {
    let user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        })
    }

})

const User = mongoose.model('users', UserSchema);

module.exports = {
    User
};