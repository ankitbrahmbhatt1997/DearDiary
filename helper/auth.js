module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        } else {
            req.flash('error_msg', 'Unauthorized Page');
            res.redirect('/users/login');
        }
    }
}