//load bcrypt
var passport = require('passport')
var bCrypt = require('bcrypt-nodejs');


module.exports = function (passport, user) {


  var User = user;

  var LocalStrategy = require('passport-local').Strategy;

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    User.findByPk(id).then(function (user) {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });


  passport.use('local-signup', new LocalStrategy(

    {

      usernameField: 'email',

      passwordField: 'password',

      passReqToCallback: true // allows us to pass back the entire request to the callback

    },



    function ( req, email, password, done) {

      var generateHash = function (password) {

        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);

      };



      User.findOne({
        where: {
          email: email
        }
      }).then(function (user) {

        if (user) {
          console.log(user)
          return done(null, false, {
            message: 'That email is already taken'
          });

        } else {
          // var userPassword = generateHash(password);
          
          // console.dir( "This is req.body " + req.body)
          var data =
          {
            email: email,
            
            password: password,
            
            firstname: req.body.firstName,
            
            lastname: req.body.lastName
            
          };
          
          User.create(data).then(function (newUser, created) {
            
            if (!newUser) {
              console.log("Testing1")
              done(null, false);

            }

            if (newUser) {
              console.log("Testing2")
               done(null,newUser);
              // newUser.isLoggedIn = true;
              // res.redirect("/");

            }

          });

        }

      });

    }

  ));



  passport.use(
    "local-signin",
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: "email",
        passwordField: "password",

      },
      function (email, password, done) {
        var isValidPassword = function (userpass, password) {
          console.log("hello")
          return bCrypt.compareSync(password, userpass);
        };

        User.findOne({ where: { email: email } })
          .then(function (user) {
            console.log(user)
            if (!user) {
              console.log("email does not exists")
              return done(null, false, { message: "Email does not exist" });
            }

            if (!isValidPassword(user.password, password)) {
              console.log("incorrect password")
              return done(null, false, { message: "Incorrect password." });
            }

            var userinfo = user.get();
            // console.log(userinfo)
            return done(null, userinfo);
          })
          .catch(function (err) {
            console.log("Something went wrong with your Signin", err);

            return done(null, false, {
              message: "Something went wrong with your Signin"
            });
          });
      }
    )
  );
};

