const User = require('../models/user');

module.exports = {
    new: newUser,
}

function newUser(req,res) {
    res.render('users/new', {
        title: 'Sign Up'
    })
}