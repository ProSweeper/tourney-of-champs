var express = require('express');
var router = express.Router();
const userCtrl = require('../controllers/users');
// Require the auth middleware
const ensureLoggedIn = require('../config/ensureLoggedIn');
const { render } = require('../server');

// all routes start with /users

// GET /users/new 
router.get('/new', ensureLoggedIn, userCtrl.new);

module.exports = router;
