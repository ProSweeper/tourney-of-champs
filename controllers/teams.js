// import the teams model
const Team = require('../models/team');

module.exports = {
    index,
    new: newTeam,
}

function index(req, res) {
    // query for all teams using an empty object, then render them
    Team.find({}, function(err, teams) {
        res.render('teams/index', {title: 'All Teams', teams})
    })
}

function newTeam(req, res) {
    // render the view for the form to create a new team
    res.render('teams/new', {title: 'New Team'});
}