//By Rutuparn Kakade
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");

const homeStartingContent = "“Gratitude is not only the greatest of virtues, but the parent of all others.” - Marcus Tullius Cicero";
const aboutContent = "I am Rutuparn Kakade. I'm on my journey to become a full stack web developer. Currently i can create a Web application using HTML, CSS and jQuery for front-end and, Express.js with Node.js for backend. In this project i have used Bootstrap CSS, EJS for templating HTML and Express with Node.js to setup a server. This is a daily gratitude journal which stores your entries.";
const contactContent = "Contact me on LinkedIn.";

const app = express();

let posts = [];
let x = "";

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){
  let date = new Date();
  let options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  };
  let todayDate = date.toLocaleDateString("en-US", options);
  res.render("Home", {today: todayDate, homeStartContent: homeStartingContent, newPostEjs: posts});
})

app.get("/about", function(req,res){
  res.render("about", {aboutMeContent: aboutContent});
  })

app.get("/contact", function(req,res){
  res.render("contact", {contactMeContent: contactContent});
})

app.get("/compose", function(req,res){
  res.render("compose");
})

app.get("/posts/:postID",function(req,res){
  let paramInput = lodash.lowerCase(req.params.postID);
  posts.forEach(function(post){
     let check = lodash.lowerCase(post.title);
     let title = post.title;
     let content = post.content;
    if(check === paramInput){
      res.render('post', {
        postTitle: title, 
        postContent: content
      });
    } 
  }
  )
})

app.post("/compose", function(req,res){
   const newPost = {
    title: req.body.newTitle,
    content: req.body.newContent
  };
  posts.push(newPost);
  res.redirect("/");
})












app.listen(process.env.PORT || 3000, function() {
  console.log("Server started");
});
