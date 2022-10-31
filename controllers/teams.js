// import the teams model
const Team = require('../models/team');

module.exports = {
    index,
}

function index(req, res) {
    // query for all teams using an empty object, then render them
    Team.find({}, function(err, teams) {
        res.render('teams/index', {title: 'All Teams', teams})
    })
}