var db = require("../models")
require("dotenv").config()
var bCrypt = require('bcryptjs');
// var salt = bCrypt.genSaltSync(process.env.SALT);
var hash = bCrypt.hashSync(process.env.HASH , salt)

module.exports = function(app){
    app.get("/api/user", function(req,res){
        db.user.findAll({})
        .then(function(dbUser){
            console.log("dbUser",dbUser);
            res.json(dbUser)
        })
    })

    app.post("/api/player/signup", function(req,res){
        db.user.findOne({
            where: {
                email: req.body.email
            }
        })
        if(!email){
            bCrypt.genSalt(process.env.SALT, function(err,salt){
                bCrypt.hash(req.body.password, salt, function(err,hash){
                    if(err) return (err);
                    req.body.password = hash
                    db.user.create(req.body).then(function(dbUser){
                        res.json(dbUser)
                    })
                })
            })
        } else{
            res.json([{ message: "This email is already taken!"}])
        }
    })

    app.post("/api/player/signin", function(req,res){
        db.user.findOne({
            where:{
                email: email
            }
        }).then(function(playerinfo){
            console.log(playerinfo)
            if(!playerinfo){
                res.json([{ message: "This Email has not yet been registered !"}])
             } else{
                bCrypt.compare(req.body.password, playerinfo.password, function(err,res){
                    if(err) return(err)
                    res.json(playerinfo)
                })
            }
        })
    })
}