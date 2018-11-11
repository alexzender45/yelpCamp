const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

const data = [
    {
        name : "Booy" ,
            image : "https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022__340.jpg",
                description : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy"
    },
    {
        name : "Rusty",
            image : "https://cdn.pixabay.com/photo/2016/11/21/15/14/camping-1845906__340.jpg",
                description : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy"
    },
    {
        name : "Harfy",
                image : "https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201__340.jpg",
                 description : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy"
    }
]

function seedDB(){
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }else{
            console.log("remove campgrounds");
    data.forEach(function(seed){
        // Added a few campgrounds
Campground.create(seed, function(err, campground){
if(err){
    console.log(err);
}else{
    console.log("newly added campground");
    // create a comment
    Comment.create(
        {
            text : "This app is dam good boy go do your own",
            author : "Samuel"
        }, function(err, comment){
            if(err){
                console.log(err)
            }else{
                campground.comments.push(comment);
                campground.save();
                console.log("Added new comment");
            }
        }
    )
}
});
    });
}
});
}

module.exports = seedDB;
