const Team = require('../models/team');

module.exports = {
    create,
}

function create(req, res) {
    // find the team that we are adding the player to the roster
    Team.findById(req.params.id, function(err, team) {
        // add player to the teams roster
        team.roster.push(req.body);
        // save the team in the database
        team.save(function(err) {
            // redirect since we are CRUDing but its to the same page
            res.redirect(`/teams/${team._id}`);
        });
    });
}
