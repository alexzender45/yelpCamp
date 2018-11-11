const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const middleware   =  require("../middleware");


    // Root Route
        router.get("/", function(req, res){
            // Get all file from the datebase
            Campground.find({}, function(err, allCampgrounds){
                if(err){
                    console.log(err);
                }else{
                    res.render("campgrounds/index", {campgrounds : allCampgrounds});
                }
            })
        });
    // Route 
        router.post("/",middleware.isLoggedIn, function(req, res){
            const name = req.body.name;
            const image = req.body.image;
            const desc = req.body.description;
            const author = {
                id : req.user._id,
                username : req.user.username
            }
            const newCampground = {name : name, image : image,description : desc, author:author}
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    })
     });
    
        router.get("/new",middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
        });
    // Show route
        router.get("/:id", function(req, res){
            Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
                if(err){
                    console.log(err);
                }else{
                    console.log(foundCampground);
                    res.render("campgrounds/show", {campground : foundCampground});  
                }
            });    
        });

        // Edit Campgrounds
        router.get("/:id/edit",middleware.checkCampgroundOwnership, function(req,res){
            // Is usere logged in
                Campground.findById(req.params.id, function(err, foundCampground){
                            res.render("campgrounds/edit", {campground : foundCampground});
        });
    });
        // Update Campgrounds
        router.put("/:id/edit",middleware.checkCampgroundOwnership, function(req, res){
// Find Campgrouds and update
         Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
             if(err){
                 res.redirect("/campgrounds");
             }else{
                 res.redirect("/campgrounds/" + req.params.id);
             }
         });
        });

        //Delete Route
        router.delete("/:id",middleware.checkCampgroundOwnership, function(req, res){
         Campground.findByIdAndRemove(req.params.id, function(err){
             if(err){
                 res.redirect("/campgrounds");
             }else{
                 res.redirect("/campgrounds");
             }
         });   
        });

        module.exports = router;