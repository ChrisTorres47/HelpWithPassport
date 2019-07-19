var session = require("express-session");
// require("dotenv").config()
// Requiring passport as we've configured it
// var passport = require("passport")
var bodyParser = require('body-parser')
var express = require("express")
// var bCrypt = require('bcrypt-nodejs');

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();
var exphbs = require('express-handlebars')
//Routes
// require('./routes/auth.js')(app,passport);

//load passport strategies
// require('./config/passport/passport.js')(passport, db.user);
// var generateHash = function (password) {

//   return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);

// };


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
// app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());



// Requiring our routes
// require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);


// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});

db.sequelize.sync().then(function() {
 
    console.log('Nice! Database looks fine')
 
}).catch(function(err) {
 
    console.log(err, "Something went wrong with the Database Update!")
 
});