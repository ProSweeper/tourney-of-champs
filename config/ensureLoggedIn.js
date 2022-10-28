// Middleware for routes that require a logged in user
module.exports = function(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    // if not logged in and they try to do something that requires
    // a logged in account then redirect to log in 
    res.redirect('/auth/google');
};