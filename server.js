var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// require the session middleware
var session = require('express-session');
// method override for our edit and delete functionality
var methodOverride = require('method-override');
// require the passport
var passport = require('passport');



// load the .env file for accessing on our server
require('dotenv').config();
// connect to the MongoDB database
require('./config/database');
// config the passport middleware
require('./config/passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var teamsRouter = require('./routes/teams');
var playersRouter = require('./routes/players');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// mount the session middleware
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));
// mount our passport
app.use(passport.initialize());
app.use(passport.session());
// store whether or not a user is logged in inside a variable 
// on the request object (if not logged in req.user === undefined)
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

// mount our method override middleware and have it look for a 
// query string of _method (the arg we pass into the function)
// we want it before the router mounts so that the http method is 
// changed before it reaches our routers
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// mount the users router so that all its roots start with '/users'
app.use('/users', usersRouter);
// mount the teams router so that all its roots start with '/teams'
app.use('/teams', teamsRouter);
// mount the players router so that its roots start with '/'
app.use('/', playersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
