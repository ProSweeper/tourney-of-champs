const mongoose = require('mongoose');

// connect to the database using the string stored in our .env file
// process .env allows us to access .env entities
mongoose.connect(process.env.DATABASE_URL);

//shortcut variable to mongoose.connection object
const db = mongoose.connection;

// add an event listener to console log when we connect to the db 
db.on('connected', function() {
    console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});