const Team = require('../models/team');

module.exports = {
    create,
    delete: deletePlayer,
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

function deletePlayer(req, res) {
    Team.findOne({
        'players._id':req.params.id,
    }, function(err, team) {        //<------ You queried for a team, not a player
        if (!team || err) {         // Update here too
            // in case of error or no player
            res.redirect(`/teams/${team._id}`);
        }
        console.log(req.body)
        team.roster.remove(req.params.id);
        team.save(function(err) {
            res.redirect(`/teams/${team._id}`);
        });
    });
}
