const {
    Strategy
} = require('passport-local');
const {
    User
} = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');

module.exports = function (passport) {
    passport.use(new Strategy({
        usernameField: 'email'
    }, (email, password, done) => {
        User.findOne({
            email
        }).then(user => {

            if (!user) {
                return done(null, false, {
                    message: 'No user found'
                });
            }

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    throw err;
                }
                if (isMatch) {
                    console.log(user);
                    return done(null, user);
                } else {

                    return done(null, false, {

                        message: 'Password Does not match'
                    });
                }
            })

        })
    }))

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}