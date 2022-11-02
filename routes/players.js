const express = require('express');
const router = express.Router();
const playersCtrl = require('../controllers/players');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// this router is mounted to a "starts with" path of '/'

// POST /teams/:id/players
router.post('/teams/:id/players', ensureLoggedIn, playersCtrl.create);

// DELETE /players/:id
router.delete('/players/:id', playersCtrl.delete);
module.exports = router;