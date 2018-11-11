const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

//Register Route
router.get("/", function(req,res){
res.render("landing");
});
router.get("/register", function(req, res){
    res.render("register");
});

// Handle signup logic
router.post("/register", function(req, res){
    req.body.username
    req.body.password
    User.register(new User ({username : req.body.username}), req.body.password, function(err, user){
        if(err){
        req.flash("error", err.message);
            return res.render("register");
        }
         passport.authenticate("local")(req, res, function(){
        req.flash("success", "Welcome To YelpCamp" );
             res.redirect("/campgrounds");
         });
    });
    });

    // Login Route
    router.get("/login", function(req, res){
        res.render("login");
    });

    // Handling login logic
    router.post("/login", passport.authenticate("local",
    {
        successRedirect : "/campgrounds",
        failureRedirect : "/login"
    }), function(req, res){
    });
// Logout Route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged You Out!");
    res.redirect("/campgrounds");
});

// Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
module.exports = router;