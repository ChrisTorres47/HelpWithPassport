var authController = require('../app/controllers/authcontroller.js');
// var passport = require('../config/passport/passport')
var passport = require("passport-local")
var db = require("../models")
var path = require("path")
 
 
module.exports = function(app, passport) {
 
    app.get('/signup', authController.signup);
 
 
    app.get('/signin', authController.signin);
 
 
    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/',
 
            failureRedirect: '/signup'
        }
 
    ));

    app.post(
        "/signin",
        passport.authenticate("local-signin", {
          successRedirect: "/",
          failureRedirect: "/signin"
        })
      );
      app.get("/profile", isLoggedIn, function(req, res) {
        res.sendFile(path.join(__dirname, "../public/homepage.html"))
      })

      app.get("/logout", function(req, res) {
        req.session.destroy(function(err) {
          res.redirect("/")
        })
      });

      function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) return next();
    
        res.redirect("/");
      }
}