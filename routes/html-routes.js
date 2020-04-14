// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
// var fs = require("fs");
// var util = require("util");
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");
// var writeFileAsynch = util.promisify(fs.writeFile);


module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  // authors route loads author-manager.html
  app.get("/storybook", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/storybook.html"));
  });

  // cms route loads cms.html
  app.get("/cms", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/cms.html"));
  });

  // authors route loads author-manager.html
  app.get("/authors", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/author-manager.html"));
  });

  //view one post. taking in the object, and placing it into the file.
  // app.get("/viewpost/:" + dbStory, function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/testpost.html"));
  // });

};
