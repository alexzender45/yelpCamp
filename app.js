const express               = require("express"),
      app                   = express(),
      bodyParser            = require("body-parser"),
      mongoose              = require("mongoose"),
      passport              =  require("passport"),
      LocalStrategy         = require("passport-local"),
      methodOverride        = require("method-override"),
      passportLocalMongoose = require("passport-local-mongoose"),
      User                  = require("./models/user"),
      Campground            = require("./models/campground"),
      Comment               =    require("./models/comment"),
      flash                 =  require("connect-flash"),
      dotenv                = require('dotenv');
      seedDB                = require("./seed"),
      port                  = process.env.PORT || 8080

      dotenv.config();
      const commentRoutes = require("./routes/comments"),
            campgroundRoutes = require("./routes/campgrounds"),
            indexRoutes  = require("./routes/index")

     // seedDB(); // Seed Database


      // Passport Confi
      app.use(require("express-session")({
          secret : "Who are you yap man",
          resave : false,
          saveUninitialized : false
      }));
      
passport.use(new LocalStrategy(User.authenticate()));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
app.use(flash());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


    //mongoose.connect("mongodb://localhost/yelp_camp");
    mongoose.connect("mongodb://samuel:Samuel_4@ds259253.mlab.com:59253/campsite");
    

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended : true}));

app.use(express.static(__dirname + "/public"));

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error  = req.flash("error");
    res.locals.success  = req.flash("success");
    next();
});
    

// Use app
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);







app.listen(process.env.PORT || 8080, function(){
    console.log("server 8080 has started");
});





