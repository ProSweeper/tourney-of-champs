// import the teams model
const Team = require('../models/team');

module.exports = {
    index,
    new: newTeam,
    create,
    show,
    edit,
    update,
}

function update(req, res) {
    Team.findByIdAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true},
        function(err, team) {
            if (err || !team) return res.redirect('/teams/index');
            res.redirect(`/teams/${team._id}`);
        }
    )
}

function edit(req, res) {
    Team.findOne({_id: req.params.id}, function(err, team) {
        if (err || !team) return res.redirect('/teams/index');
        res.render(`teams/edit`, {
            title: 'Edit Team',
            team
        });
    });
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
    // get the user from our middleware function so we can save them to the team they make
    req.body.user = req.user._id;
    // save the users name
    req.body.userName = req.user.name;
    // save their avatar in case we want to access it 
    req.body.userAvatar = req.user.avatar;
    // create a new team from the form (info is saved in request body)
    Team.create(req.body, function(err, team) {
        // performing CRUD so redirect needed
        res.redirect('/teams');
    });
}

function show(req, res) {
    Team.findById(req.params.id, function(err, team) {
        res.render('teams/show', {
            title: `${team.teamName}`,
            team,
        });
    });
}