// import the teams model
const Team = require('../models/team');

module.exports = {
    index,
    new: newTeam,
    create,
}

function index(req, res) {
    // query for all teams using an empty object, then render them
    Team.find({}, function(err, teams) {
        res.render('teams/index', {title: 'All Teams', teams})
    })
}

function newTeam(req, res) {
    // save the enum values in a variable so we can pass it to the view
    const validSkillLevels = Team.schema.path('skillLevel').enumValues;
    // render the view for the form to create a new team
    res.render('teams/new', {
        title: 'New Team',
        // skill levels for the form
        validSkillLevels,
    });
}

function create(req, res) {
    // create a new team from the form (info is saved in request body)
    Team.create(req.body, function(err, team) {
        // performing CRUD so redirect needed
        res.redirect('/teams');
    });
}