const express = require('express');
const router = express.Router();
const teamsCtrl = require('../controllers/teams');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// all routes start with /teams

// GET /teams (display all teams)
router.get('/', teamsCtrl.index);
// GET /teams/new
router.get('/new', teamsCtrl.new);
// POST /teams
router.post('/', teamsCtrl.create);
// GET /teams/:id
router.get('/:id', teamsCtrl.show);

module.exports = router;